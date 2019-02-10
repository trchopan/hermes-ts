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
      <ChatInput/>
      <ChatRoomDrawer class="d-inline-block"/>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter, namespace } from "vuex-class";
import { CHAT_ACTIONS, chatStoreNamespace } from "@/app/chat/chat.store";
import { AUTH_ROUTE } from "@/app/auth/auth.models";
import ChatRoomDrawer from "./ChatRoomDrawer.vue";
import ChatEditProfile from "./ChatEditProfile.vue";
import ChatInput from "./ChatInput.vue";
import { IMappedLanguage, IUser } from "@/store/root.models";

const chatStore = namespace(chatStoreNamespace);

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
  public user!: IUser | null;
  @chatStore.Action(CHAT_ACTIONS.subscribeChatList)
  public subscribeChatList!: () => Promise<void>;

  public created() {
    if (!this.user) {
      this.$router.replace(AUTH_ROUTE);
    } else {
      this.subscribeChatList();
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
