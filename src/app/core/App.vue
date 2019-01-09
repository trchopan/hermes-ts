<template>
  <v-app :dark="true">
    <AppToolbar/>
    <AppDrawer/>
    <v-content>
      <v-container
        fluid
        class="white--text"
      >
        <transition
          name="fade"
          mode="out-in"
        >
          <router-view/>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppToolbar from "./AppToolbar.vue";
import AppDrawer from "./AppDrawer.vue";
import { ACTIONS } from "@/store/root.store";

export default Vue.extend({
  name: "App",
  components: {
    AppToolbar,
    AppDrawer
  },
  data() {
    return {
      //
    };
  },
  created() {
    this.$store.dispatch(ACTIONS.initLocalStorage);
  }
});
</script>

<style lang="scss" src="@/assets/style.scss" />
