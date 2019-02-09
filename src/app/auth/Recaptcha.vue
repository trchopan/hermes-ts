<template>
  <div id="recaptcha-container"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ROOT_ACTIONS } from "@/store/root.store";
import { Getter } from "vuex-class";
import { IMappedLanguage } from "@/store/root.models";
import firebase from "firebase/app";

@Component({
  name: "Recaptcha"
})
export default class Recaptcha extends Vue {
  @Getter
  public $t!: IMappedLanguage;
  public verifier: firebase.auth.RecaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container",
    { size: "invisible" }
  );

  public async mounted() {
    this.$store.dispatch(
      ROOT_ACTIONS.changeLoadingMessage,
      this.$t.verifyRecaptcha
    );
    try {
      const widgetId = await this.verifier.render();
      const token = await this.verifier.verify();
      this.$store.dispatch(ROOT_ACTIONS.finishLoading);
      this.$emit("verifier", this.verifier);
    } catch (error) {
      error.message = this.$t.errorRegisterCaptcha;
      this.$store.dispatch(ROOT_ACTIONS.changeError, error);
    }
  }

  public destroyed() {
    this.verifier.clear();
  }
}
</script>
