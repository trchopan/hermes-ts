<template>
  <div>
    <section id="introduciton">
      <h1 class="display-1 primary--text">{{ $t.auth }}</h1>
      <P>{{ $t.introduciton }}</P>
    </section>
    <section id="actions">
      <v-layout
        align-center
        justify-center
        column
        fill-height
      >
        <v-btn
          color="primary"
          class="text-none"
        >{{ $t.signInEmail }}</v-btn>
        <v-btn
          color="secondary"
          class="text-none"
        >{{ $t.signInPhone }}</v-btn>
        <v-btn
          color="primary"
          class="text-none"
          outline
          :to="signUpEmailRoute"
        >{{ $t.signUpEmail }}</v-btn>
      </v-layout>
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
import { AUTH_SIGN_UP_EMAIL_ROUTE } from "@/app/auth/auth.routes";

@Component({})
export default class Auth extends Vue {
  @State("language")
  public language!: ILanguageSetting;
  public signUpEmailRoute: string = AUTH_SIGN_UP_EMAIL_ROUTE;

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }
}
</script>

<style lang="scss" scoped>
.v-btn {
  width: 15rem;
}
</style>
