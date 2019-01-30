<template>
  <v-layout
    align-center
    justify-center
  >
    <v-flex v-if="user">
      <ChatEditProfile/>
      <ChatRoomDrawer class="d-inline-block"/>
      <router-view></router-view>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";
import { ILanguageSetting } from "@/store/root.models";
import { Watch } from "vue-property-decorator";
import { LANGUAGES_MAP } from "@/app/chat/chat.models";
import ChatRoom from "./ChatRoom.vue";
import ChatRoomDrawer from "./ChatRoomDrawer.vue";
import ChatEditProfile from "./ChatEditProfile.vue";

@Component({
  name: "Chat",
  components: {
    ChatRoom,
    ChatRoomDrawer,
    ChatEditProfile
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
</style>
