<template>
  <v-dialog
    v-model="appErroring"
    max-width="300"
  >
    <v-card
      class="elevation-12"
      color="warn"
      dark
    >
      <v-card-title>
        <span class="title">{{ $t.error }}</span>
      </v-card-title>
      <v-card-text>{{ errorMessage }}</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter } from "vuex-class";
import { ILanguageMap, IMappedLanguage } from "@/plugins/translate";
import { ILanguageSetting } from "@/store/root.models";

const LANGUAGES_MAP: ILanguageMap = {
  error: {
    vi: "Lỗi",
    en: "Error"
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
  @Getter("appErroring")
  public appErroring!: boolean;

  get $t(): IMappedLanguage {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }
}
</script>
