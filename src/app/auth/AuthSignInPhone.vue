<template>
  <v-layout
    align-center
    justify-center
  >
    <Recaptcha @verifier="registerRecaptcha($event)"/>
    <v-flex
      xs12
      sm6
      md4
    >
      <transition
        name="slide"
        mode="out-in"
      >
        <v-card
          class="elevation-12"
          key="phone-number-card"
          v-if="!phoneNumberSubmited"
        >
          <v-form
            v-model="formValid"
            id="sign-in-form"
            ref="signInForm"
            lazy-validation
            @submit.prevent="submit()"
          >
            <v-toolbar
              dark
              color="primary"
            >
              <v-toolbar-title>{{ $t.signInPhone }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text key="form-sign-in">
              <p>{{ $t.phoneDescription }}</p>
              <v-text-field
                v-model="phone"
                prepend-icon="phone"
                prefix="+84"
                name="phone"
                mask="#### ### ####"
                :rules="phoneRules"
                :label="$t.phoneNumber"
                type="text"
                validate-on-blur
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                type="button"
                flat
                :to="authRoute"
              >{{ $t.goBack }}</v-btn>
              <v-btn
                form="sign-in-form"
                color="secondary"
                type="submit"
              >{{ $t.sendCode }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <v-card
          class="elevation-12"
          key="confirmation-code-card"
          v-if="phoneNumberSubmited"
        >
          <v-form
            v-model="formValid"
            id="confirm-form"
            ref="confirmForm"
            lazy-validation
            @submit.prevent="confirm()"
          >
            <v-toolbar
              dark
              color="primary"
            >
              <v-toolbar-title>{{ $t.confirmCode }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text key="form-confirm">
              <p>{{ $t.confirmCodeDescription }}</p>
              <p class="title secondary--text text-xs-center">{{ phone }}</p>
              <v-text-field
                v-model="confirmCode"
                prepend-icon="lock"
                name="confirmCode"
                :rules="confirmCodeRules"
                :label="$t.confirmCode"
                type="text"
                validate-on-blur
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                outline
                type="button"
                @click="reset()"
              >{{ $t.resendCode }}</v-btn>
              <v-btn
                form="confirm-form"
                color="secondary"
                type="submit"
              >{{ $t.signIn }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </transition>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter } from "vuex-class";
import { Watch } from "vue-property-decorator";
import { IMappedLanguage } from "@/store/root.models";
import {
  AUTH_LANGUAGES,
  PHONE_COUNTRY_CODE,
  AUTH_ROUTE
} from "@/app/auth/auth.models";
import Recaptcha from "@/app/auth/Recaptcha.vue";
import { ITextFieldRule } from "@/app/shared/types";
import { ROOT_ACTIONS } from "@/store/root.store";
import { CHAT_ROUTE } from "@/app/chat/chat.models";
import { firebaseApp } from "@/firebase";

@Component({
  name: "AuthSignInPhone",
  components: { Recaptcha }
})
export default class AuthSignInPhone extends Vue {
  @Getter
  public $t!: IMappedLanguage;
  @State
  public user!: firebase.User;
  public verifier!: firebase.auth.RecaptchaVerifier;
  public authRoute = AUTH_ROUTE;
  public formValid: boolean = true;
  public phone: string = "";
  public phoneRules: ITextFieldRule[] = [];
  public confirmationResult!: firebase.auth.ConfirmationResult;
  public confirmCode: string = "";
  public confirmCodeRules: ITextFieldRule[] = [];
  public phoneNumberSubmited: boolean = false;

  public created() {
    this.phoneRules = [
      v => (v && v.length >= 9 && v.length <= 10) || this.$t.invalidPhone
    ];
    this.confirmCodeRules = [
      v => (v && v.length > 0) || this.$t.enterConfirmationCode
    ];
    if (this.user) {
      this.$router.replace(CHAT_ROUTE);
    }
  }

  public registerRecaptcha(recaptchaVerifier: firebase.auth.RecaptchaVerifier) {
    this.verifier = recaptchaVerifier;
  }

  public async submit() {
    if ((this.$refs.signInForm as any).validate()) {
      const phoneNumber = PHONE_COUNTRY_CODE + this.phone.replace(/^0/, "");
      try {
        // Send SMS
        this.$store.dispatch(
          ROOT_ACTIONS.changeLoadingMessage,
          this.$t.sendingVerificationCode
        );
        this.confirmationResult = await firebaseApp
          .auth()
          .signInWithPhoneNumber(phoneNumber, this.verifier);
        this.phoneNumberSubmited = true;
        this.$store.dispatch(ROOT_ACTIONS.finishLoading);
      } catch (error) {
        // SMS is not sent
        error.message = this.$t.unableSendVerificationCode;
        this.$store.dispatch(ROOT_ACTIONS.changeError, error);
      }
    }
  }

  public async confirm() {
    if ((this.$refs.confirmForm as any).validate() && this.confirmationResult) {
      try {
        this.$store.dispatch(
          ROOT_ACTIONS.changeLoadingMessage,
          this.$t.confirmingVerfificationCode
        );
        const user = await this.confirmationResult.confirm(this.confirmCode);
        this.$store.dispatch(ROOT_ACTIONS.finishLoading);
        this.$router.replace(CHAT_ROUTE);
      } catch (error) {
        if (error.code === "auth/invalid-verification-code") {
          error.message = this.$t.invalidVerificationCode;
          this.$store.dispatch(ROOT_ACTIONS.changeError, error);
        } else {
          error.message = this.$t.unableVerifyCode;
          this.$store.dispatch(ROOT_ACTIONS.changeError, error);
        }
      }
    }
  }

  public reset() {
    this.phoneNumberSubmited = false;
    this.confirmCode = "";
  }
}
</script>
