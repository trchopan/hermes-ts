<template>
  <div>
    <v-btn
      icon
      dark
      color="secondary"
      @click="rightDrawer = !rightDrawer"
    >
      <v-icon>chat</v-icon>
    </v-btn>
    <v-navigation-drawer
      v-model="rightDrawer"
      right
      temporary
      fixed
    >
      <v-list subheader>
        <v-subheader>
          <span>{{ $t.contactsList }}</span>
          <v-spacer></v-spacer>
          <ChatAddContact/>
        </v-subheader>
        <v-list-tile
          v-for="user in contactsList"
          :key="'user-' + user.uid"
          :to="chatUserRoute + user.uid"
          avatar
        >
          <v-list-tile-avatar>
            <img :src="'/images/' + (user.photoURL || defaultProfileImage)">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ user.displayName || $t.noName }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="$route.params.id === user.uid">
            <v-list-tile-action-text>
              <v-icon>chat_bubble_outline</v-icon>
            </v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter } from "vuex-class";
import { IUser, IProfile, IMappedLanguage } from "@/store/root.models";
import {
  CHATROOMS_COLLECTION,
  DEFAULT_PROFILE_IMAGE,
  CHAT_ROUTE,
  CHAT_USER_ROUTE
} from "@/app/chat/chat.models";
import ChatAddContact from "@/app/chat/ChatAddContact.vue";
import { fireStore } from "@/firebase";
import { ROOT_ACTIONS } from "@/store/root.store";
import { chatStoreNamespace } from "@/app/chat/chat.store";

@Component({
  name: "ChatRoomDrawer",
  components: {
    ChatAddContact
  }
})
export default class ChatRoomDrawer extends Vue {
  @Getter
  public $t!: IMappedLanguage;
  @State
  public user!: firebase.User;
  @State(state => state.chatStore.contactsList)
  public contactsList!: IUser[];
  public chatUserRoute = `${CHAT_ROUTE}/${CHAT_USER_ROUTE.replace(":id", "")}`;
  public defaultProfileImage = DEFAULT_PROFILE_IMAGE;
  public rightDrawer: boolean = false;
}
</script>
