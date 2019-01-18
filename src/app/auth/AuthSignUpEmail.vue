<template>
  <p>Sign up Email</p>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";
import { ILanguageSetting } from "@/store/root.models";
import { LANGUAGES_MAP } from "./AuthSignUpEmail.models";

@Component({
  name: "AuthSignUpEmail"
})
export default class AuthSignUpEmail extends Vue {
  @State("language")
  public language!: ILanguageSetting;

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }
}
</script>
