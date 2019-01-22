<template>
  <div id="recaptcha-container"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { firebaseApp, ReCaptchaVerifier } from "@/firebase";
import { ROOT_ACTIONS, IRecaptchaData } from "@/store/root.store";
import { ERROR_ACTIONS } from "@/store/error.store";

@Component({
  name: "Recaptcha"
})
export default class Recaptcha extends Vue {
  public async mounted() {
    const verifier = new ReCaptchaVerifier("recaptcha-container", {
      size: "invisible"
    });
    try {
      const widgetId = await verifier.render();
      const token = await verifier.verify();
      const data: IRecaptchaData = {
        verifier,
        widgetId,
        token
      };
      this.$store.dispatch(ROOT_ACTIONS.registerRecaptcha, data);
    } catch (error) {
      this.$store.dispatch(ERROR_ACTIONS.catchError, error);
    }
  }

  public destroyed() {
    this.$store.dispatch(ROOT_ACTIONS.registerRecaptcha, undefined);
  }
}
</script>
