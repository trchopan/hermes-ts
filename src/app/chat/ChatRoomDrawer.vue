<template>
  <div class="ctn">
    <v-btn
      icon
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
        <v-list-tile to="/chat/room/afdsfaiwe3tt2t">
          <v-list-tile-content>
            <v-list-tile-title>Room 2</v-list-tile-title>
          </v-list-tile-content>
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
import { LANGUAGES_MAP } from "@/app/chat/chat.models";
import ChatCreateRoom from "@/app/chat/ChatCreateRoom.vue";

@Component({
  name: "ChatRoomDrawer",
  components: {
    ChatCreateRoom
  }
})
export default class ChatRoomDrawer extends Vue {
  @State("language")
  public language!: ILanguageSetting;
  public rightDrawer: boolean = false;

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }
}
</script>

<style lang="scss" scoped>
.ctn {
  display: inline-block;
}
</style>
