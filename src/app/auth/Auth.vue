<template>
  <v-layout
    column
    align-center
    justify-start
  >
    <section id="introduciton">
      <h1 class="display-1 primary--text">{{ $t.auth }}</h1>
      <P>{{ $t.introduciton }}</P>
    </section>
    <section
      v-if="!user"
      id="sign-in"
    >
      <v-layout
        align-center
        justify-center
        column
        fill-height
      >
        <v-btn
          color="primary"
          class="text-none"
          :to="signInEmailRoute"
        >{{ $t.signInEmail }}</v-btn>
        <v-btn
          color="secondary"
          class="text-none"
          :to="signInPhoneRoute"
        >{{ $t.signInPhone }}</v-btn>
        <v-btn
          color="primary"
          class="text-none"
          outline
          :to="signUpEmailRoute"
        >{{ $t.signUpEmail }}</v-btn>
      </v-layout>
    </section>
    <section v-if="user">
      <v-layout
        align-center
        justify-center
        column
      >
        <v-btn
          color="primary"
          class="text-none"
          to="/chat"
        >{{ $t.joinChat }}</v-btn>
        <v-btn
          color="primary"
          class="text-none"
          outline
          :to="signOutRoute"
        >{{ $t.signOut }}</v-btn>
      </v-layout>
    </section>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter } from "vuex-class";
import {
  ILanguageSetting,
  LANGUAGE_SETTINGS,
  IMappedLanguage
} from "@/store/root.models";
import {
  AUTH_SIGN_UP_EMAIL_ROUTE,
  AUTH_SIGN_IN_EMAIL_ROUTE,
  AUTH_SIGN_IN_PHONE_ROUTE,
  AUTH_SIGN_OUT_ROUTE
} from "@/app/auth/auth.models";
import { fireAuth } from "@/firebase";

@Component({
  name: "Auth"
})
export default class Auth extends Vue {
  @Getter
  public $t!: IMappedLanguage;
  @State
  public user!: firebase.User;
  public signUpEmailRoute: string = AUTH_SIGN_UP_EMAIL_ROUTE;
  public signInEmailRoute: string = AUTH_SIGN_IN_EMAIL_ROUTE;
  public signInPhoneRoute: string = AUTH_SIGN_IN_PHONE_ROUTE;
  public signOutRoute: string = AUTH_SIGN_OUT_ROUTE;
}
</script>

<style lang="scss" scoped>
#sign-in > * > .v-btn {
  width: 15rem;
}
</style>
