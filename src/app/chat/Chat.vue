<template>
  <v-layout
    column
    fill-height
    :class="$vuetify.breakpoint.mdAndUp ? 'px-5': ''"
  >
    <router-view class="chat-view"></router-view>
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
import { State } from "vuex-class";
import { ILanguageSetting } from "@/store/root.models";
import { Watch } from "vue-property-decorator";
import { LANGUAGES_MAP } from "@/app/chat/chat.models";
import ChatRoomDrawer from "./ChatRoomDrawer.vue";
import ChatEditProfile from "./ChatEditProfile.vue";
import ChatInput from "./ChatInput.vue";

@Component({
  name: "Chat",
  components: {
    ChatRoomDrawer,
    ChatEditProfile,
    ChatInput
  }
})
export default class Chat extends Vue {
  @State("language")
  public language!: ILanguageSetting;
  @State("user")
  public user!: firebase.User;

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }

  public mounted() {
    if (!this.user) {
      this.$router.replace("/auth");
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-view {
  height: 0;
  overflow-y: scroll;
}
</style>
