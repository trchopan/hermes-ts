<template>
  <v-layout
    ref="chatView"
    column
  >
    <v-flex>
      <p v-if="!chatContents.length">(No chat)</p>
      <v-layout
        v-for="chat in chatContents"
        :key="'chat-' + chat.timestamp"
        align-center
      >
        <v-spacer v-if="chat.senderId === user.uid"></v-spacer>
        <!-- TODO: Avatar here should be of the sender avatar not the current user -->
        <v-avatar
          v-else
          size="3rem"
        >
          <img
            :src="'/images/'+user.photoURL"
            alt="User avatar"
          >
        </v-avatar>
        <v-card
          dark
          class="ma-2"
          :color="chat.senderId === user.uid ? 'primary' : 'secondary'"
        >
          <v-card-text>
            <div>{{ chat.message }}</div>
            <div
              class="font-weight-light caption"
              :class="chat.senderId === user.uid ? 'text-xs-right' : ''"
            >{{ chat.timestamp | dateFormat(language.value) }} {{ chat.senderId === user.uid && chat.delivered ? "✓": ""}}</div>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { fireStore } from "@/firebase";
import {
  CHATROOMS_COLLECTION,
  CHATS_COLLECTION,
  IChatContent
} from "@/app/chat/chat.models";
import { State } from "vuex-class";
import { ILanguageSetting } from "@/store/root.models";
import { Watch } from "vue-property-decorator";

@Component({
  name: "ChatUser"
})
export default class ChatUser extends Vue {
  @State("language")
  public language!: ILanguageSetting;
  @State("user")
  public user!: firebase.User;
  public chatContents: IChatContent[] = [];

  private chatDocumentName: string = "";
  // To be called to finish the query before the component is destroyed
  private chatContentsQuery: any = null;

  public created() {
    this.chatContentsQuery = this.queryChatContents();
  }

  @Watch("chatContents")
  private onChatContentsChanged(value: IChatContent[], oldVal: IChatContent[]) {
    setTimeout(() => {
      this.scrollDown();
    }, 200);
  }

  public destroyed() {
    this.chatContentsQuery();
  }

  public scrollDown() {
    const chatView = this.$refs.chatView as any;
    chatView.scroll({
      top: chatView.scrollHeight,
      behavior: "smooth"
    });
  }

  private queryChatContents() {
    this.chatDocumentName =
      this.user.uid > this.$route.params.id
        ? this.user.uid + this.$route.params.id
        : this.$route.params.id + this.user.uid;
    return fireStore
      .collection(CHATROOMS_COLLECTION)
      .doc(this.chatDocumentName)
      .collection(CHATS_COLLECTION)
      .orderBy("timestamp")
      .limit(50)
      .onSnapshot(result => {
        this.chatContents = result.empty
          ? []
          : result.docs.map(
              doc => ({ _id: doc.id, ...doc.data() } as IChatContent)
            );
        const markForDelivered = this.chatContents
          .filter(x => x.senderId != this.user.uid && !x.delivered)
          .map(chat =>
            fireStore
              .collection(CHATROOMS_COLLECTION)
              .doc(this.chatDocumentName)
              .collection(CHATS_COLLECTION)
              .doc(chat._id)
              .update({ delivered: true })
          );
        if (markForDelivered.length > 0) {
          Promise.all(markForDelivered);
        }
      });
  }
}
</script>
