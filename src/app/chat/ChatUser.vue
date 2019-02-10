<template>
  <v-layout
    ref="chatView"
    column
  >
    <v-layout
      v-if="chatContent.length === 0"
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
        v-for="chat in chatContent"
        :key="'chat-' + chat.timestamp"
        align-center
      >
        <v-spacer v-if="chat.senderId === user.uid"></v-spacer>
        <v-avatar
          v-else
          size="3rem"
        >
          <img
            :src="'/images/'+receiverPhotoUrl"
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
import { State, Getter, namespace } from "vuex-class";
import { chatStoreNamespace, CHAT_ACTIONS } from "@/app/chat/chat.store";
import { IMappedLanguage, IUser, ILanguageSetting } from "@/store/root.models";
import { IChatContent, IChatRoom, CHAT_ROUTE } from "@/app/chat/chat.models";

const chatStore = namespace(chatStoreNamespace);

@Component({
  name: "ChatUser"
})
export default class ChatUser extends Vue {
  @State
  public user!: IUser | null;
  @State
  public language!: ILanguageSetting;
  @chatStore.State
  public chatRooms!: IChatRoom[];
  @Getter
  public $t!: IMappedLanguage;
  @chatStore.State
  public chatContent!: IChatContent[];
  @chatStore.Action(CHAT_ACTIONS.selectChatRoom)
  public selectChatRoom!: (receiverId: string) => void;

  public created() {
    if (this.chatRooms.length === 0) {
      this.$router.replace(CHAT_ROUTE);
    } else {
      this.selectChatRoom(this.$route.params.id);
    }
  }

  public scrollDown() {
    const chatView = this.$refs.chatView as any;
    chatView.scroll({
      top: chatView.scrollHeight,
      behavior: "smooth"
    });
  }
}
</script>
