<template>
  <v-dialog
    v-model="appErroring"
    max-width="300"
    persistent
  >
    <v-card
      class="elevation-12"
      color="warn"
      dark
    >
      <v-card-title>
        <span class="title">{{ $t.notice }}</span>
      </v-card-title>
      <v-card-text>{{ errorMessage }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          flat
          outline=""
          @click="appErroring = false"
        >{{ $t.dismiss }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter } from "vuex-class";
import { ILanguageMap, IMappedLanguage } from "@/plugins/translate";
import { ILanguageSetting } from "@/store/root.models";
import { ROOT_ACTIONS } from "@/store/root.store";

const LANGUAGES_MAP: ILanguageMap = {
  notice: {
    vi: "Thông báo",
    en: "Notice"
  },
  dismiss: {
    vi: "Đóng",
    en: "Dismiss"
  }
};

@Component({
  name: "AppErrorDialog"
})
export default class AppErrorDialog extends Vue {
  @State("language")
  public language!: ILanguageSetting;
  @State("errorMessage")
  public errorMessage!: string | null;

  get appErroring(): boolean {
    return this.$store.getters.appErroring;
  }

  set appErroring(state: boolean) {
    if (state === false) {
      this.$store.dispatch(ROOT_ACTIONS.clearErrorMessage);
    }
  }

  get $t(): IMappedLanguage {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }
}
</script>
