<template>
  <v-layout
    align-center
    justify-center
  >
    <v-flex
      xs8
      sm6
      md4
    >
      <v-card
        class="elevation-12"
        color="primary"
      >
        <v-card-text>
          {{ $t.signingOut }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";
import { ILanguageSetting } from "@/store/root.models";
import { LANGUAGES_MAP } from "@/app/auth/Auth.models";
import { fireAuth } from "@/firebase";
import { ERROR_ACTIONS } from "@/store/error.store";

@Component({
  name: "AuthSignOut"
})
export default class AuthSignOut extends Vue {
  @State("language")
  public language!: ILanguageSetting;

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }

  public async created() {
    try {
      await fireAuth.signOut();
      this.$router.replace("/auth");
    } catch (error) {
      this.$store.dispatch(ERROR_ACTIONS.catchError, error);
    }
  }
}
</script>
