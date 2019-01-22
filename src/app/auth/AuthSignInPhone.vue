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
                mask="### ### ####"
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
                form="sign-in-form"
                color="secondary"
                type="submit"
                :loading="loading"
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
              <p>{{ $format($t.confirmCodeDescription, [phone]) }}</p>
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
                :loading="loading"
                @click="reset()"
              >{{ $t.resendCode }}</v-btn>
              <v-btn
                form="confirm-form"
                color="secondary"
                type="submit"
                :loading="loading"
              >{{ $t.signIn }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </transition>
      <Recaptcha/>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";
import { Watch } from "vue-property-decorator";
import { ILanguageSetting } from "@/store/root.models";
import { LANGUAGES_MAP } from "./Auth.models";
import Recaptcha from "@/app/shared/Recaptcha.vue";
import { ITextFieldRule } from "@/app/shared/types";
import { fireAuth } from "@/firebase";
import { IRecaptchaData } from "@/store/root.store";
import { ERROR_ACTIONS } from "@/store/error.store";

export const COUNTRY_CODE = "+84";

@Component({
  name: "AuthSignInPhone",
  components: { Recaptcha }
})
export default class AuthSignInPhone extends Vue {
  @State("language")
  public language!: ILanguageSetting;
  @State("recaptcha")
  public recaptcha!: IRecaptchaData;
  @State("user")
  public user!: firebase.User;
  public formValid: boolean = true;
  public phone: string = "";
  public phoneRules: ITextFieldRule[] = [];
  public confirmationResult!: firebase.auth.ConfirmationResult;
  public confirmCode: string = "";
  public confirmCodeRules: ITextFieldRule[] = [];
  public phoneNumberSubmited: boolean = false;

  private _loading: boolean = false;

  public created() {
    this.phoneRules = [
      v => (v && v.length >= 9 && v.length <= 10) || this.$t.invalidPhone
    ];
    this.confirmCodeRules = [
      v => (v && v.length > 0) || this.$t.invalidConfirmCode
    ];
  }

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
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
      this.$router.replace("/chat");
    }
  }

  public async submit() {
    if ((this.$refs.signInForm as any).validate()) {
      this.loading = true;
      try {
        // Send SMS
        this.confirmationResult = await fireAuth.signInWithPhoneNumber(
          COUNTRY_CODE + this.phone,
          this.recaptcha.verifier
        );
        this.phoneNumberSubmited = true;
      } catch (error) {
        // SMS is not sent
        this.$store.dispatch(ERROR_ACTIONS.catchError, error);
      } finally {
        this.loading = false;
      }
    }
  }

  public async confirm() {
    if ((this.$refs.confirmForm as any).validate() && this.confirmationResult) {
      this.loading = true;
      try {
        const user = await this.confirmationResult.confirm(this.confirmCode);
      } catch (error) {
        this.$store.dispatch(ERROR_ACTIONS.catchError, error);
      } finally {
        this.loading = false;
      }
    }
  }

  public reset() {
    this.phoneNumberSubmited = false;
    this.confirmCode = "";
  }
}
</script>
