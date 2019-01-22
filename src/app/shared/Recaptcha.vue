<template>
  <div id="recaptcha-container"></div>
</template>

<script lang="ts">
import Vue from "vue";
import { firebaseApp, ReCaptchaVerifier } from "@/firebase";
import Component from "vue-class-component";
import { ROOT_ACTIONS, IRecaptchaData } from "@/store/root.store";

@Component({
  name: "Recaptcha"
})
export default class Recaptcha extends Vue {
  public async mounted() {
    const recaptcha = new ReCaptchaVerifier("recaptcha-container", {
      size: "invisible"
    });
    const widgetId = await recaptcha.render();
    const token = await recaptcha.verify();
    const data: IRecaptchaData = {
      recaptcha,
      widgetId,
      token
    };
    this.$store.dispatch(ROOT_ACTIONS.registerRecaptcha, data);
    // this.$emit("response", token);
  }
}
</script>
