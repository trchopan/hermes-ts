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
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              form="sign-up-form"
              color="secondary"
              type="submit"
            >{{ $t.signUp}}</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";
import { ILanguageSetting } from "@/store/root.models";
import { LANGUAGES_MAP } from "./AuthSignUpEmail.models";
import { validateEmail } from "@/app/shared/validate-email.helper";

@Component({
  name: "AuthSignUpEmail"
})
export default class AuthSignUpEmail extends Vue {
  @State("language")
  public language!: ILanguageSetting;
  public fromValid: boolean = true;
  public email: string = "";
  public password: string = "";
  public emailRules: any[] = [];
  public passwordRules: any[] = [];
  public repasswordRules: any[] = [];

  public created() {
    this.emailRules = [(v: string) => validateEmail(v) || this.$t.invalidEmail];
    this.passwordRules = [
      (v: string) => (v && v.length > 3) || this.$t.invalidPassword
    ];
    this.repasswordRules = [
      (v: string) => (v && v === this.password) || this.$t.invalidRepassword
    ];
  }

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }

  public submit() {
    // TODO: Check validate using this.$refs.form.validate() then submit
  }
}
</script>
