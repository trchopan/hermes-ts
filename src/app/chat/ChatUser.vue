<template>
  <v-layout
    column
    align-center
    justify-center
  >
    <v-flex>
      <p>Hi from ChatUser {{ userId }}</p>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "ChatUser"
})
export default class ChatUser extends Vue {
  public userId: string = "";
  public mounted() {
    this.userId = this.$route.params.id;
  }
}
</script>
