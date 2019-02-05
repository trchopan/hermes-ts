<template>
  <v-layout
    column
    fill-height
    class="chat-container ma-auto"
  >
    <v-layout
      v-if="!$route.params.id"
      column
      justify-center
      align-center
      class="mx-5"
    >
      <p>{{ $t.clickChatRoomIcon }}</p>
      <v-btn
        icon
        dark
        color="secondary"
      >
        <v-icon>chat</v-icon>
      </v-btn>
    </v-layout>
    <router-view
      class="chat-view"
      :key="$route.path"
    ></router-view>
    <v-layout
      shrink
      justify-center
      align-center
      class="mt-2"
    >
      <ChatEditProfile class="mr-2"/>
      <ChatInput :receiverId="$route.params.id"/>
      <ChatRoomDrawer class="d-inline-block"/>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter } from "vuex-class";
import {
  USERS_COLLECTION,
  parseProfile,
  IUser,
  IMappedLanguage
} from "@/store/root.models";
import ChatRoomDrawer from "./ChatRoomDrawer.vue";
import ChatEditProfile from "./ChatEditProfile.vue";
import ChatInput from "./ChatInput.vue";
import { fireStore, fireFunctions } from "@/firebase";
import { ROOT_ACTIONS } from "@/store/root.store";
import { CHAT_ACTIONS } from "@/app/chat/chat.store";

@Component({
  name: "Chat",
  components: {
    ChatRoomDrawer,
    ChatEditProfile,
    ChatInput
  }
})
export default class Chat extends Vue {
  @Getter
  public $t!: IMappedLanguage;
  @State
  public user!: firebase.User;
  public listUsersCallable = fireFunctions.httpsCallable("listUsers");

  public async created() {
    if (!this.user) {
      this.$router.replace("/auth");
    } else {
      this.$store.dispatch(CHAT_ACTIONS.subscribeContactList);
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-container {
  max-width: 900px;
}
.chat-view {
  height: 0;
  overflow-y: scroll;
}
</style>
