<template>
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
      <v-icon>settings</v-icon>
    </v-btn>
    <v-card>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-select
              :value="language"
              :items="languageSettings"
              :label="$t.selectLanguage"
              @change="changeLanguage($event)"
            />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-switch
              class="pr-3 pt-2"
              :label="$t.lightOut"
              :input-value="theme"
              :true-value="themeSettings[1]"
              :false-value="themeSettings[0]"
              @change="changeTheme($event)"
            />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-card-actions v-if="user">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          type="button"
          outline
          :to="authSignOutRoute"
        >{{ $t.signOut }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import {
  LANGUAGE_SETTINGS,
  THEME_SETTINGS,
  IThemeSetting,
  ILanguageSetting
} from "@/store/root.models";
import { ROOT_ACTIONS } from "@/store/root.store";
import Component from "vue-class-component";
import { State } from "vuex-class";
import { IMappedLanguage } from "@/plugins/translate";
import { LANGUAGES_MAP } from "@/app/core/app.models";
import { AUTH_SIGN_OUT_ROUTE } from "@/app/auth/auth.routes";

@Component({
  name: "AppToolbarMenu"
})
export default class AppToolbarMenu extends Vue {
  @State("language")
  public language!: ILanguageSetting;
  @State("theme")
  public theme!: IThemeSetting;
  @State("user")
  public user!: firebase.User;

  public authSignOutRoute = AUTH_SIGN_OUT_ROUTE;
  public languageSettings = LANGUAGE_SETTINGS;
  public themeSettings = THEME_SETTINGS;
  public menuOpen = false;

  get $t(): IMappedLanguage {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }
  public changeLanguage(language: string) {
    const foundLanguage = LANGUAGE_SETTINGS.find(x => x.value === language);
    this.$store.dispatch(ROOT_ACTIONS.changeLanguage, foundLanguage);
  }
  public changeTheme(theme: IThemeSetting) {
    this.$store.dispatch(ROOT_ACTIONS.changeTheme, theme);
  }
}
</script>
