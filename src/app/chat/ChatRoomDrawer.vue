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
          <span>{{ $t.chatRooms }}</span>
          <v-spacer></v-spacer>
          <ChatCreateRoom/>
        </v-subheader>
        <v-list-tile
          v-for="room in joinedChatRooms"
          :key="'joined-' + room.id"
          :to="chatRoomRoute + room.id"
        >
          <v-list-tile-content>
            <v-list-tile-title>
              <span v-if="user.uid === room.owner">👑</span>
              <span>{{ room.name }}</span>
            </v-list-tile-title>
            <v-list-tile-sub-title>{{ $t.participants }}: {{ room.participants.length }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="$route.params.id === room.id">
            <v-list-tile-action-text>
              <v-icon>chat_bubble_outline</v-icon>
            </v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list subheader>
        <v-subheader>
          <span>{{ $t.usersList }}</span>
          <v-spacer></v-spacer>
          <v-progress-circular
            v-if="loadingUserList"
            indeterminate
            :width="2"
            :size="20"
            color="#9e9e9e"
          ></v-progress-circular>
          <v-btn
            v-else
            icon
            flat
            @click="loadUsersList()"
          >
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-subheader>
        <v-list-tile
          v-for="user in usersList"
          :key="'user-' + user.uid"
          :to="chatUserRoute + user.uid"
          avatar
        >
          <v-list-tile-avatar>
            <img :src="'/images/' + (user.photoURL || defaultProfileImage)">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ user.displayName || $t.noName }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ $t.joined}} {{ parseCreationTime(user.metadata.creationTime) }}</v-list-tile-sub-title>
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
import { State } from "vuex-class";
import { ILanguageSetting, IUser } from "@/store/root.models";
import {
  LANGUAGES_MAP,
  CHATROOMS_COLLECTION,
  IChatRoom,
  DEFAULT_PROFILE_IMAGE
} from "@/app/chat/chat.models";
import ChatCreateRoom from "@/app/chat/ChatCreateRoom.vue";
import { fireStore, fireFunctions } from "@/firebase";
import {
  CHAT_ROUTE,
  CHAT_ROOM_ROUTE,
  CHAT_USER_ROUTE
} from "@/app/chat/chat.routes";
import { ROOT_ACTIONS } from "@/store/root.store";

@Component({
  name: "ChatRoomDrawer",
  components: {
    ChatCreateRoom
  }
})
export default class ChatRoomDrawer extends Vue {
  @State("user")
  public user!: firebase.User;
  public chatRoomRoute = `${CHAT_ROUTE}/${CHAT_ROOM_ROUTE.replace(":id", "")}`;
  public chatUserRoute = `${CHAT_ROUTE}/${CHAT_USER_ROUTE.replace(":id", "")}`;
  public defaultProfileImage = DEFAULT_PROFILE_IMAGE;
  public listUsersCallable = fireFunctions.httpsCallable("listUsers");
  public rightDrawer: boolean = false;
  public ownerChatRooms: IChatRoom[] = [];
  public joinedChatRooms: IChatRoom[] = [];
  public usersList: IUser[] = [];
  public loadingUserList: boolean = false;

  @State("language")
  public language!: ILanguageSetting;

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }

  // To be called to finish the query before the component is destroyed
  private chatRoomsQuery: any = null;

  public async created() {
    this.chatRoomsQuery = this.queryChatRooms();
    await this.loadUsersList();
  }

  public queryChatRooms() {
    return fireStore
      .collection(CHATROOMS_COLLECTION)
      .where("participants", "array-contains", this.user.uid)
      .onSnapshot(snapshot => {
        if (!snapshot.empty) {
          this.joinedChatRooms = snapshot.docs
            .map(doc => {
              const data = doc.data();
              return {
                id: doc.id,
                name: data.name || "(no name)",
                owner: data.owner || "(no owner)",
                participants: data.participants || []
              } as IChatRoom;
            })
            .sort((a, b) =>
              a.owner === this.user.uid ? -1 : a.owner > b.owner ? 0 : 1
            );
        }
      });
  }

  public async loadUsersList() {
    try {
      this.loadingUserList = true;
      const result = await this.listUsersCallable();
      this.usersList = (result.data.users as IUser[])
        .filter(x => x.uid !== this.user.uid)
        .sort(
          (a, b) =>
            new Date(b.metadata.lastSignInTime).getTime() -
            new Date(a.metadata.lastSignInTime).getTime()
        );
    } catch (error) {
      error.message = this.$t.errorGettingUsersList;
      this.$store.dispatch(ROOT_ACTIONS.changeError, error);
    } finally {
      this.loadingUserList = false;
    }
  }

  public parseCreationTime(creationTime: string) {
    return new Date(creationTime).toLocaleDateString(this.language.value);
  }

  public destroyed() {
    this.chatRoomsQuery();
  }
}
</script>
