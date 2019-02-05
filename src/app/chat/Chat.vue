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

@Component({
  name: "Chat",
  components: {
    ChatRoomDrawer,
    ChatEditProfile,
    ChatInput
  }
})
export default class Chat extends Vue {
  @Getter("$t")
  public $t!: IMappedLanguage;
  @State("user")
  public user!: firebase.User;
  public listUsersCallable = fireFunctions.httpsCallable("listUsers");

  public async created() {
    if (!this.user) {
      this.$router.replace("/auth");
    } else {
      try {
        const profile = await fireStore
          .collection(USERS_COLLECTION)
          .doc(this.user.uid)
          .get()
          .then(snapshot => {
            if (!snapshot.exists) {
              this.$store.dispatch(
                ROOT_ACTIONS.changeError,
                this.$t.noProfileFound
              );
              return null;
            } else {
              const profileData = parseProfile(snapshot.data());
              this.$store.dispatch(ROOT_ACTIONS.changeUserProfile, profileData);
              return profileData;
            }
          });

        if (profile && profile.contacts) {
          const result = await this.listUsersCallable({
            users: profile.contacts
          });
          const usersList = (result.data.users as IUser[]).filter(
            x => x.uid !== this.user.uid
          );
          this.$store.dispatch(ROOT_ACTIONS.changeUsersList, usersList);
        }
      } catch (error) {
        error.message = this.$t.errorGettingUsersList;
        this.$store.dispatch(ROOT_ACTIONS.changeError, error);
      }
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
