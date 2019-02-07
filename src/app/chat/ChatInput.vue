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
        :disabled="!receiverId"
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
  parseChatDocName
} from "@/app/chat/chat.models";
import { State, Getter } from "vuex-class";
import { fireStore } from "@/firebase";
import { Prop } from "vue-property-decorator";
import { IMappedLanguage } from "@/store/root.models";
import { ROOT_ACTIONS } from "@/store/root.store";

@Component({
  name: "ChatInput"
})
export default class ChatInput extends Vue {
  @Getter
  public $t!: IMappedLanguage;
  @State
  public user!: firebase.User;
  @Prop(String)
  public receiverId!: string;
  public message: string = "";

  public async sendMessage() {
    if (this.message && this.receiverId) {
      const chatDocName = parseChatDocName(this.user.uid, this.receiverId);
      const chatContent: IChatContent = {
        senderId: this.user.uid,
        message: this.message,
        timestamp: Date.now(),
        delivered: false
      };
      try {
        const result = await fireStore
          .collection(CHATROOMS_COLLECTION)
          .doc(chatDocName)
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
