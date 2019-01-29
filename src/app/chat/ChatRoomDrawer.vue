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
        <v-list-tile to="/chat/room/bloablo1">
          <v-list-tile-content>
            <v-list-tile-title>Room 1</v-list-tile-title>
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

@Component({
  name: "ChatRoomDrawer"
})
export default class ChatRoomDrawer extends Vue {
  public rightDrawer: boolean = false;
}
</script>

<style lang="scss" scoped>
.ctn {
  display: inline-block;
}
</style>
