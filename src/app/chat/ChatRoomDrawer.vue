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
        <template v-for="user in contacts">
          <v-list-tile
            v-if="user"
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
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, namespace } from "vuex-class";
import ChatAddContact from "@/app/chat/ChatAddContact.vue";
import { chatStoreNamespace } from "@/app/chat/chat.store";
import {
  IChatRoom,
  CHAT_ROUTE,
  CHAT_USER_ROUTE,
  DEFAULT_PROFILE_IMAGE
} from "@/app/chat/chat.models";
import { IMappedLanguage, IProfile } from "@/store/root.models";

const chatStore = namespace(chatStoreNamespace);

@Component({
  name: "ChatRoomDrawer",
  components: {
    ChatAddContact
  }
})
export default class ChatRoomDrawer extends Vue {
  @Getter
  public $t!: IMappedLanguage;
  @chatStore.Getter
  public contacts!: IProfile[];
  public chatUserRoute = `${CHAT_ROUTE}/${CHAT_USER_ROUTE.replace(":id", "")}`;
  public defaultProfileImage = DEFAULT_PROFILE_IMAGE;
  public rightDrawer: boolean = false;
}
</script>
