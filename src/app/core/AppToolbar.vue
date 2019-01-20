<template>
  <v-toolbar
    app
    dark
    flat
    clipped-left
    color="primary"
  >
    <v-toolbar-side-icon @click="toggleDrawer()"/>
    <v-toolbar-title>
      <router-link
        to="/"
        class="title-link"
      >{{ title }}</router-link>
    </v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items>
      <AppToolbarMenu/>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ROOT_ACTIONS } from "@/store/root.store";
import { LANGUAGE_SETTINGS } from "@/store/root.models";
import { ILanguage } from "@/plugins/translate";
import AppToolbarMenu from "./AppToolbarMenu.vue";

@Component({
  name: "AppToolbar",
  components: {
    AppToolbarMenu
  }
})
export default class AppToolbar extends Vue {
  public title = process.env.VUE_APP_TITLE;
  public menuOpen = false;
  public toggleDrawer() {
    this.$store.dispatch(ROOT_ACTIONS.toggleDrawer);
  }
}
</script>

<style lang="scss" scoped>
.title-link {
  color: inherit;
  text-decoration: none;
}
</style>
