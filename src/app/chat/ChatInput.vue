<template>
  <v-flex
    xs12
    md8
  >
    <v-form
      id="message-form"
      @submit.prevent="sendMessage()"
    >
      <v-text-field
        v-model="message"
        :label="$t.inputMessage"
        type="text"
        full-width
        flat
        hide-details
        solo
        append-icon="send"
        class="chat-input-field"
        @click:append="sendMessage()"
      ></v-text-field>
    </v-form>
  </v-flex>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {
  IChatContent,
  CHATROOMS_COLLECTION,
  CHATS_COLLECTION,
  parseChatDocName,
  IChatRoom
} from "@/app/chat/chat.models";
import { State, Getter, namespace } from "vuex-class";
import { IMappedLanguage } from "@/store/root.models";
import { ROOT_ACTIONS } from "@/store/root.store";
import { firebaseApp } from "@/firebase";
import { chatStoreNamespace } from "@/app/chat/chat.store";

const chatStore = namespace(chatStoreNamespace);

@Component({
  name: "ChatInput"
})
export default class ChatInput extends Vue {
  @Getter
  public $t!: IMappedLanguage;
  @State
  public user!: firebase.User;
  @chatStore.State
  public selectedChatRoom!: IChatRoom;
  public message: string = "";

  public async sendMessage() {
    if (this.message) {
      const chatContent: IChatContent = {
        senderId: this.user.uid,
        message: this.message,
        timestamp: Date.now(),
        delivered: false
      };
      try {
        const result = await firebaseApp
          .firestore()
          .collection(CHATROOMS_COLLECTION)
          .doc(this.selectedChatRoom.id)
          .collection(CHATS_COLLECTION)
          .add(chatContent);

        this.message = "";
      } catch (error) {
        this.$store.dispatch(
          ROOT_ACTIONS.changeError,
          this.$t.unableSendMessage
        );
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-input-field {
  border: solid 1px;
  border-radius: 2px;
}
</style>
