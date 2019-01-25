<template>
  <div>
    <v-dialog
      v-model="editDialog"
      max-width="500"
    >
      <v-btn slot="activator">{{ $t.change }}</v-btn>
      <ChatEditProfile @profileUpdated="editDialog = false"/>
    </v-dialog>
    <ChatRoom/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";
import { ILanguageSetting } from "@/store/root.models";
import { Watch } from "vue-property-decorator";
import { LANGUAGES_MAP } from "@/app/chat/chat.models";
import ChatEditProfile from "./ChatEditProfile.vue";
import ChatRoom from "./ChatRoom.vue";

@Component({
  name: "Chat",
  components: { ChatEditProfile, ChatRoom }
})
export default class Chat extends Vue {
  @State("language")
  public language!: ILanguageSetting;
  @State("user")
  public user!: firebase.User;
  public editDialog: boolean = false;

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }

  public mounted() {
    if (!this.user) {
      this.$router.replace("/auth");
    }
    if (this.user && !this.user.displayName) {
      this.editDialog = true;
    }
  }
}
</script>
