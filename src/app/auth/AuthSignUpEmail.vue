<template>
  <v-layout
    align-center
    justify-center
  >
    <v-flex
      xs12
      sm6
      md4
    >
      <v-card class="elevation-12">
        <v-form
          v-model="fromValid"
          id="sign-up-form"
          ref="form"
          lazy-validation
          @submit.prevent="submit()"
        >
          <v-toolbar
            dark
            color="primary"
          >
            <v-toolbar-title>{{ $t.signUpForm }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              v-model="email"
              prepend-icon="email"
              name="email"
              label="Email"
              type="text"
              :rules="emailRules"
              validate-on-blur
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              prepend-icon="lock"
              name="password"
              :label="$t.password"
              :rules="passwordRules"
              validate-on-blur
              type="password"
            ></v-text-field>
            <v-text-field
              prepend-icon="lock"
              name="re-password"
              :label="$t.reconfirmPassword"
              :rules="repasswordRules"
              validate-on-blur
              type="password"
            ></v-text-field>
            <Recaptcha @response="recaptchaed($event)"/>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              form="sign-up-form"
              color="secondary"
              type="submit"
            >{{ $t.signUp }}</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      <div class="text-xs-center mt-3">
        <p>{{ $t.hasAccount }}</p>
        <v-btn
          color="primary"
          outline
          to="/sign-in-email"
        >{{ $t.signIn }}</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";
import { LANGUAGES_MAP } from "./Auth.models";
import { ILanguageSetting } from "@/store/root.models";
import { validateEmail } from "@/app/shared/validate-email.helper";
import { ITextFieldRule } from "@/app/shared/types";
import { fireAuth, ReCaptchaVerifier } from "@/firebase";
import Recaptcha from "@/app/shared/Recaptcha.vue";
import { ERROR_ACTIONS } from "@/store/error.store";
import { AUTH_SIGN_IN_EMAIL_ROUTE } from "@/app/auth/auth.routes";

@Component({
  name: "AuthSignUpEmail",
  components: { Recaptcha }
})
export default class AuthSignUpEmail extends Vue {
  @State("language")
  public language!: ILanguageSetting;
  @State("user")
  public user!: firebase.User;
  public fromValid: boolean = true;
  public email: string = "";
  public password: string = "";
  public emailRules: ITextFieldRule[] = [];
  public passwordRules: ITextFieldRule[] = [];
  public repasswordRules: ITextFieldRule[] = [];
  public signInEmailRoute: string = AUTH_SIGN_IN_EMAIL_ROUTE;

  public created() {
    this.emailRules = [v => validateEmail(v) || this.$t.invalidEmail];
    this.passwordRules = [v => (v && v.length > 3) || this.$t.invalidPassword];
    this.repasswordRules = [
      v => (v && v === this.password) || this.$t.invalidRepassword
    ];
  }

  public mounted() {
    if (this.user) {
      this.$router.replace("/chat");
    }
  }

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }

  public async submit() {
    // TODO: Check validate using this.$refs.form.validate() then submit
    if ((this.$refs.form as any).validate()) {
      try {
        const user = await fireAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        if (user) {
          this.$router.replace("/chat");
        }
      } catch (error) {
        this.$store.dispatch(ERROR_ACTIONS.catchError, error);
      }
    }
  }
}
</script>
