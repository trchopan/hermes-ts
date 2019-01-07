<template>
  <v-app>
    <v-content>
      <p>Hi, Chop Tr</p>
      <router-link to="/" class="secondary--text">Home</router-link>
      <router-link to="/about" class="secondary--text">About</router-link>
      <p class="warn--text">Warn color</p>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "App",
  data() {
    return {
      //
    };
  }
});
</script>