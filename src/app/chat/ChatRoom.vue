<template>
  <v-layout
    column
    align-center
    justify-center
  >
  <v-flex><p>Hi from ChatRoom</p></v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "ChatRoom"
})
export default class ChatRoom extends Vue {}
</script>
