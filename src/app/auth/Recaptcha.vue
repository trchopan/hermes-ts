<template>
  <div id="recaptcha-container"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { firebaseApp, ReCaptchaVerifier } from "@/firebase";
import { ROOT_ACTIONS } from "@/store/root.store";
import { State } from "vuex-class";
import { ILanguageSetting } from "@/store/root.models";
import { ILanguageMap } from "@/plugins/translate";
import { IRecaptchaData } from "@/app/auth/auth.models";

const LANGUAGES_MAP: ILanguageMap = {
  verifyRecaptcha: {
    vi: "Đang xác lập Recaptcha...",
    en: "Verifying Recaptcha..."
  },
  errorRegisterCaptcha: {
    vi: "Không thể xác lập Recaptcha",
    en: "Unable to verify Recaptcha"
  }
};

@Component({
  name: "Recaptcha"
})
export default class Recaptcha extends Vue {
  @State("language")
  public language!: ILanguageSetting;

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }

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
