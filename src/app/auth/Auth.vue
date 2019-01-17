<template>
  <div>
    <section id="introduciton">
      <h1 class="display-1 primary--text">{{ $t.auth }}</h1>
      <P>{{ $t.introduciton }}</P>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";
import { ILanguageSetting, LANGUAGE_SETTINGS } from "@/store/root.models";
import { ILanguageMap } from "@/plugins/translate";
import { LANGUAGES_MAP } from "./Auth.models";

@Component({
  name: "Auth"
})
export default class Auth extends Vue {
  @State("language")
  public language!: ILanguageSetting;

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }
}
</script>
