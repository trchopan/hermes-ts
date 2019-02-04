<template>
  <div id="recaptcha-container"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { firebaseApp, ReCaptchaVerifier } from "@/firebase";
import { ROOT_ACTIONS } from "@/store/root.store";
import { State, Getter } from "vuex-class";
import { ILanguageSetting, IMappedLanguage } from "@/store/root.models";
import { ILanguageMap } from "@/plugins/translate";
import { IRecaptchaData, AUTH_LANGUAGES } from "@/app/auth/auth.models";

@Component({
  name: "Recaptcha"
})
export default class Recaptcha extends Vue {
  @Getter("$t")
  public $t!: IMappedLanguage;
  @State("language")
  public language!: ILanguageSetting;

  public async mounted() {
    const verifier = new ReCaptchaVerifier("recaptcha-container", {
      size: "invisible"
    });
    this.$store.dispatch(
      ROOT_ACTIONS.changeLoadingMessage,
      this.$t.verifyRecaptcha
    );
    try {
      const widgetId = await verifier.render();
      const token = await verifier.verify();
      const data: IRecaptchaData = {
        verifier,
        widgetId,
        token
      };
      this.$store.dispatch(ROOT_ACTIONS.registerRecaptcha, data);
      this.$emit("ready", true);
      this.$store.dispatch(ROOT_ACTIONS.finishLoading);
    } catch (error) {
      error.message = this.$t.errorRegisterCaptcha;
      this.$store.dispatch(ROOT_ACTIONS.changeError, error);
    }
  }

  public destroyed() {
    this.$store.dispatch(ROOT_ACTIONS.registerRecaptcha, undefined);
  }
}
</script>
