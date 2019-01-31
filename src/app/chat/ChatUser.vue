<template>
  <v-layout
    ref="chatView"
    column
  >
    <v-layout
      v-if="loadingChat"
      justify-center
      align-center
      column
      fill-height
    >
      <v-progress-circular
        indeterminate
        :width="3"
        :size="62"
        color="primary"
        class="ma-3"
      ></v-progress-circular>
      <p>{{ $t.loadingChat }}</p>
    </v-layout>
    <v-layout
      v-if="!loadingChat && chatContents.length === 0"
      justify-center
      align-center
      column
      fill-height
    >
      <v-icon size="50">mood</v-icon>
      <p>{{ $t.noMessage }}</p>
    </v-layout>
    <v-flex v-else>
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
            >
              <span>{{ chat.timestamp | dateFormat(language.value) }}</span>
              <span
                v-if="chat.senderId === user.uid"
              >{{ chat.delivered ? "✓": "..."}}</span>
            </div>
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
  LANGUAGES_MAP,
  CHATROOMS_COLLECTION,
  CHATS_COLLECTION,
  IChatContent,
  parseChatDocName,
  parseChatContent
} from "@/app/chat/chat.models";
import { State } from "vuex-class";
import { ILanguageSetting } from "@/store/root.models";
import { Watch } from "vue-property-decorator";
import { ROOT_ACTIONS } from "@/store/root.store";

@Component({
  name: "ChatUser"
})
export default class ChatUser extends Vue {
  @State("language")
  public language!: ILanguageSetting;
  @State("user")
  public user!: firebase.User;
  public loadingChat: boolean = false;
  public chatContents: IChatContent[] = [];

  // To be called to finish the query before the component is destroyed
  private chatContentsQuery: any = null;

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }

  public created() {
    this.chatContentsQuery = this.queryChatContents(
      this.user.uid,
      this.$route.params.id
    );
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

  @Watch("chatContents")
  private onChatContentsChanged(value: IChatContent[], oldVal: IChatContent[]) {
    setTimeout(() => {
      this.scrollDown();
    }, 200);
  }

  private queryChatContents(userId: string, receiverId: string) {
    this.loadingChat = true;
    const chatDocName = parseChatDocName(userId, receiverId);
    const chatDoc = fireStore.collection(CHATROOMS_COLLECTION).doc(chatDocName);

    const resultHandler = (result: firebase.firestore.QuerySnapshot) => {
      const markDelivered: Array<Promise<void>> = [];
      result.docChanges().forEach(change => {
        const content = parseChatContent(change.doc.id, change.doc.data());
        if (!content) {
          this.$store.dispatch(
            ROOT_ACTIONS.changeError,
            this.$t.errorReadingChatContent
          );
          return;
        }
        if (change.type === "added") {
          this.chatContents.push(content);
          if (content.senderId !== this.user.uid && !content.delivered) {
            markDelivered.push(
              chatDoc
                .collection(CHATS_COLLECTION)
                .doc(content._id)
                .update({ delivered: true })
            );
          }
        }
        if (change.type === "modified") {
          this.chatContents.splice(change.newIndex, 1, content);
        }
      });

      if (markDelivered.length > 0) {
        Promise.all(markDelivered).catch(error => {
          error.message = this.$t.unableUpdateDeliveredStatus;
          this.$store.dispatch(ROOT_ACTIONS.changeError, error);
        });
      }
    };

    const initChatDoc = async () =>
      await chatDoc.set({ [userId]: true, [receiverId]: true });

    return chatDoc
      .collection(CHATS_COLLECTION)
      .orderBy("timestamp")
      .limit(50)
      .onSnapshot(async result => {
        if (!result.empty) {
          resultHandler(result);
        } else {
          await initChatDoc();
        }
        this.loadingChat = false;
      });
  }
}
</script>
