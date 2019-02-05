<template></template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter } from "vuex-class";
import { IMappedLanguage } from "@/store/root.models";
import { fireAuth } from "@/firebase";
import { ROOT_ACTIONS } from "@/store/root.store";
import { AUTH_ROUTE } from "@/app/auth/auth.routes";

@Component({
  name: "AuthSignOut"
})
export default class AuthSignOut extends Vue {
  @Getter("$t")
  public $t!: IMappedLanguage;

  public async created() {
    try {
      this.$store.dispatch(
        ROOT_ACTIONS.changeLoadingMessage,
        this.$t.signingOut
      );
      await fireAuth.signOut();
      this.$store.dispatch(ROOT_ACTIONS.finishLoading);
      this.$router.replace(AUTH_ROUTE);
    } catch (error) {
      error.message = this.$t.signOutError;
      this.$store.dispatch(ROOT_ACTIONS.changeError, error);
    }
  }
}
</script>
