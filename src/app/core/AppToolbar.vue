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
      <v-menu
        v-model="menuOpen"
        :close-on-content-click="false"
        offset-y
        left
      >
        <v-btn
          slot="activator"
          flat
        >
          {{ language }}
          <!-- <v-icon>language</v-icon> -->
        </v-btn>
        <v-card>
          <v-list two-line>
            <v-list-tile
              avatar
              @click="menuOpen = false"
            >
              <v-list-tile-title>List 1</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              avatar
              @click="menuOpen = false"
            >
              <v-list-tile-title>List 2</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import Vue from "vue";
import { ACTIONS } from "@/store/root.store";
import { LanguageOptions } from "@/store/root.models";

export default Vue.extend({
  name: "AppToolbar",
  data: () => ({
    title: process.env.VUE_APP_TITLE,
    menuOpen: false
  }),
  computed: {
    language() {
      switch (this.$store.getters.language) {
        case "vi":
          return LanguageOptions.vi;
        case "en":
          return LanguageOptions.en;
      }
    }
  },
  methods: {
    toggleDrawer() {
      this.$store.dispatch(ACTIONS.toggleDrawer);
    }
  }
});
</script>

<style lang="scss" scoped>
.title-link {
  color: inherit;
  text-decoration: none;
}
</style>
