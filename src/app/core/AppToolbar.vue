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
        offset-y
        left
      >
        <v-btn
          slot="activator"
          flat
        >
          <v-icon>language</v-icon>
        </v-btn>
        <v-card>
          <v-list>
            <template v-for="(language, index) in languageSettings">
              <v-list-tile
                :key="'language-' + language.value"
                @click="changeLanguage(language)"
              >
                <v-list-tile-content>
                  <v-list-tile-title
                    :class="{ 'primary--text': language === currentLanguage}"
                  >{{ language.text }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider
                v-if="index < languageSettings.length - 1"
                :key="'divider-'+language.value"
              ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import Vue from "vue";
import { ACTIONS } from "@/store/root.store";
import { LANGUAGE_SETTINGS } from "@/store/root.models";

export default Vue.extend({
  name: "AppToolbar",
  data: () => ({
    title: process.env.VUE_APP_TITLE,
    menuOpen: false,
    languageSettings: LANGUAGE_SETTINGS
  }),
  computed: {
    currentLanguage() {
      return this.$store.getters.language;
    }
  },
  methods: {
    toggleDrawer() {
      this.$store.dispatch(ACTIONS.toggleDrawer);
    },
    changeLanguage(language) {
      this.$store.dispatch(ACTIONS.changeLanguage, language);
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
