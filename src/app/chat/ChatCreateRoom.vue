<template>
  <v-dialog
    v-model="dialogOpen"
    max-width="500"
  >
    <v-btn
      slot="activator"
      outline
    >{{ $t.createChatRoom }}</v-btn>
    <v-card class="elevation-12">
      <v-form
        v-model="formValid"
        id="create-room-form"
        ref="createChatRoomForm"
        lazy-validation
        @submit.prevent="createChatRoom()"
      >
        <v-toolbar
          dark
          color="primary"
        >
          <v-toolbar-title>{{ $t.createChatRoom }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="chatRoomName"
            :label="$t.chatRoomName"
            :rules="roomNameRules"
            type="text"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            type="button"
            outline
            @click="dialogOpen = false"
          >{{ $t.cancel }}</v-btn>
          <v-btn
            form="create-room-form"
            color="secondary"
            type="submit"
          >{{ $t.create }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";
import { ILanguageSetting } from "@/store/root.models";
import { LANGUAGES_MAP, CHATROOM_COLLECTION } from "@/app/chat/chat.models";
import { fireStore } from "@/firebase";
import { ITextFieldRule } from "@/app/shared/types";
import { ROOT_ACTIONS } from "@/store/root.store";

@Component({
  name: "ChatCreateRoom"
})
export default class ChatCreateRoom extends Vue {
  @State("language")
  public language!: ILanguageSetting;
  @State("user")
  public user!: firebase.User;
  public dialogOpen: boolean = false;
  public formValid: boolean = false;
  public chatRoomName: string = "";
  public roomNameRules: ITextFieldRule[] = [];

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }

  public created() {
    this.roomNameRules = [
      v => (v && v.length > 3) || this.$t.roomNameMustLongerThanThree
    ];
  }

  public async createChatRoom() {
    if ((this.$refs.createChatRoomForm as any).validate() && this.user) {
      try {
        this.$store.dispatch(
          ROOT_ACTIONS.changeLoadingMessage,
          this.$t.creatingChatRoom
        );
        await fireStore.collection(CHATROOM_COLLECTION).add({
          name: this.chatRoomName,
          owner: this.user.uid,
          participants: [this.user.uid]
        });
        this.$store.dispatch(ROOT_ACTIONS.finishLoading);
      } catch (error) {
        error.message = this.$t.unableCreateChatRoom;
        this.$store.dispatch(ROOT_ACTIONS.changeError, error);
      } finally {
        this.dialogOpen = false;
        (this.$refs.createChatRoomForm as any).reset();
      }
    }
  }
}
</script>
