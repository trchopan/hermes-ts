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
  CHATS_COLLECTION
} from "@/app/chat/chat.models";
import { State } from "vuex-class";
import { fireStore } from "@/firebase";

@Component({
  name: "ChatInput"
})
export default class ChatInput extends Vue {
  @State("user")
  public user!: firebase.User;
  public message: string = "";

  private chatDocumentName: string = "";

  public created() {
    this.chatDocumentName =
      this.user.uid > this.$route.params.id
        ? this.user.uid + this.$route.params.id
        : this.$route.params.id + this.user.uid;
  }

  public async sendMessage() {
    if (this.message && this.chatDocumentName) {
      const chatContent: IChatContent = {
        senderId: this.user.uid,
        message: this.message,
        timestamp: Date.now(),
        delivered: false
      };

      const result = await fireStore
        .collection(CHATROOMS_COLLECTION)
        .doc(this.chatDocumentName)
        .collection(CHATS_COLLECTION)
        .add(chatContent);

      this.message = "";
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
