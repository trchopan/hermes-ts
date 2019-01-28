<template>
  <v-layout
    align-center
    justify-center
  >
    <Recaptcha @ready="finishLoadingRecaptcha = true"/>
    <v-flex
      v-if="finishLoadingRecaptcha"
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
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              form="sign-up-form"
              color="secondary"
              type="submit"
              :loading="loading"
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
import { Watch } from "vue-property-decorator";
import { ILanguageSetting } from "@/store/root.models";
import { validateEmail } from "@/app/shared/validate-email.helper";
import { ITextFieldRule } from "@/app/shared/types";
import { fireAuth, ReCaptchaVerifier } from "@/firebase";
import Recaptcha from "./Recaptcha.vue";
import { AUTH_SIGN_IN_EMAIL_ROUTE, AUTH_ROUTE } from "@/app/auth/auth.routes";
import { IRecaptchaData, ROOT_ACTIONS } from "@/store/root.store";
import { CHAT_ROUTE } from "@/app/chat/chat.routes";

@Component({
  name: "AuthSignUpEmail",
  components: { Recaptcha }
})
export default class AuthSignUpEmail extends Vue {
  @State("language")
  public language!: ILanguageSetting;
  @State("recaptcha")
  public recaptcha!: IRecaptchaData;
  @State("user")
  public user!: firebase.User;
  public finishLoadingRecaptcha: boolean = false;
  public fromValid: boolean = true;
  public email: string = "";
  public password: string = "";
  public emailRules: ITextFieldRule[] = [];
  public passwordRules: ITextFieldRule[] = [];
  public repasswordRules: ITextFieldRule[] = [];
  public signInEmailRoute: string = AUTH_SIGN_IN_EMAIL_ROUTE;

  private _loading: boolean = false;

  public created() {
    this.emailRules = [v => validateEmail(v) || this.$t.invalidEmail];
    this.passwordRules = [v => (v && v.length > 3) || this.$t.invalidPassword];
    this.repasswordRules = [
      v => (v && v === this.password) || this.$t.invalidRepassword
    ];
  }

  get loading(): boolean {
    return !(this.recaptcha && !!this.recaptcha.verifier) || this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }

  @Watch("user")
  public onUserChange(val: firebase.User, oldVal: firebase.User) {
    if (val) {
      this.$router.replace(CHAT_ROUTE);
    }
  }

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }

  public async submit() {
    if ((this.$refs.form as any).validate()) {
      try {
        this.$store.dispatch(
          ROOT_ACTIONS.changeLoadingMessage,
          this.$t.signingUp
        );
        await fireAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        this.$store.dispatch(ROOT_ACTIONS.finishLoading);
        this.$router.replace(CHAT_ROUTE);
      } catch (error) {
        error.message = this.$t.unableSignUp;
        this.$store.dispatch(ROOT_ACTIONS.changeError, error);
      }
    }
  }
}
</script>
