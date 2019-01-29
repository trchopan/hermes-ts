<template>
  <div class="ctn">
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
      <v-list class="pa-0">
        <v-list-tile>
          <v-list-tile-content>
            <ChatCreateRoom class="mx-auto"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list
        v-if="joinedChatRooms.length > 0"
        subheader
      >
        <v-subheader>{{ $t.chatRooms }}</v-subheader>
        <v-list-tile
          v-for="room in joinedChatRooms"
          :key="'joined-' + room.id"
          :to="chatRoomRoute + room.id"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ room.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ $t.participants }}: {{ room.participants.length }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="room.owner === user.uid">
            <v-list-tile-action-text>{{ $t.owner }}</v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";
import { ILanguageSetting } from "@/store/root.models";
import {
  LANGUAGES_MAP,
  CHATROOM_COLLECTION,
  IChatRoom
} from "@/app/chat/chat.models";
import ChatCreateRoom from "@/app/chat/ChatCreateRoom.vue";
import { fireStore } from "@/firebase";
import { CHAT_ROUTE, CHAT_ROOM_ROUTE } from "@/app/chat/chat.routes";

@Component({
  name: "ChatRoomDrawer",
  components: {
    ChatCreateRoom
  }
})
export default class ChatRoomDrawer extends Vue {
  @State("language")
  public language!: ILanguageSetting;
  @State("user")
  public user!: firebase.User;
  public rightDrawer: boolean = false;
  public ownerChatRooms: IChatRoom[] = [];
  public joinedChatRooms: IChatRoom[] = [];
  public chatRoomRoute = `${CHAT_ROUTE}/${CHAT_ROOM_ROUTE.replace(":id", "")}`;

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }

  public created() {
    fireStore
      .collection(CHATROOM_COLLECTION)
      .where("participants", "array-contains", this.user.uid)
      .onSnapshot(snapshot => {
        if (!snapshot.empty) {
          this.joinedChatRooms = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name || "(no name)",
              owner: data.owner || "(no owner)",
              participants: data.participants || []
            } as IChatRoom;
          });
        }
      });
  }
}
</script>

<style lang="scss" scoped>
.ctn {
  display: inline-block;
}
</style>
