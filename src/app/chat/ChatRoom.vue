<template>
  <v-layout
    column
    align-center
    justify-center
  >
    <v-flex>
      <p>Hi from ChatRoom {{ roomId }}</p>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "ChatRoom"
})
export default class ChatRoom extends Vue {
  public roomId: string = "";
  public mounted() {
    this.roomId = this.$route.params.id;
  }
}
</script>
