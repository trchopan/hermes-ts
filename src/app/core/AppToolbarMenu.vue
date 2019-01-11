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
              :value="currentLanguage"
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
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import {
  ISettings,
  LANGUAGE_SETTINGS,
  THEME_SETTINGS
} from "@/store/root.models";
import { ACTIONS } from "@/store/root.store";
import { ILanguageMap, IMappedLanguage } from "@/plugins/translate";
import Component from "vue-class-component";

const LANGUAGES_MAP: ILanguageMap = {
  selectLanguage: { vi: "Chọn ngôn ngữ", en: "Select language" },
  lightOut: { vi: "Tắt đèn", en: "Light out" }
};

@Component({
  name: "AppToolbarMenu"
})
export default class AppToolbarMenu extends Vue {
  public languageSettings = LANGUAGE_SETTINGS;
  public themeSettings = THEME_SETTINGS;
  public menuOpen = false;

  get $t(): IMappedLanguage {
    return this.$translate(LANGUAGES_MAP, this.$store.state.language.value);
  }
  get currentLanguage() {
    return this.$store.state.language;
  }
  get theme(): ISettings {
    return this.$store.getters.theme;
  }
  public changeLanguage(language: string) {
    const foundLanguage = LANGUAGE_SETTINGS.find(x => x.value === language);
    this.$store.dispatch(ACTIONS.changeLanguage, foundLanguage);
  }
  public changeTheme(theme: ISettings) {
    this.$store.dispatch(ACTIONS.changeTheme, theme);
  }
}
</script>
