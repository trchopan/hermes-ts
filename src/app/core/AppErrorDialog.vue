<template>
  <v-dialog
    v-model="appErroring"
    max-width="300"
    persistent
  >
    <v-card
      v-if="error"
      class="elevation-12"
      color="warn"
      dark
    >
      <v-card-title>
        <span class="title">{{ $t.notice }}</span>
      </v-card-title>
      <v-card-text>{{ error.message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          flat
          outline
          @click="appErroring = false"
        >{{ $t.dismiss }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter } from "vuex-class";
import { IError, IMappedLanguage } from "@/store/root.models";
import { ROOT_ACTIONS } from "@/store/root.store";

@Component({
  name: "AppErrorDialog"
})
export default class AppErrorDialog extends Vue {
  @Getter("$t")
  public $t!: IMappedLanguage;
  @State("error")
  public error!: IError | null;

  get appErroring(): boolean {
    return this.$store.getters.appErroring;
  }

  set appErroring(state: boolean) {
    if (state === false) {
      this.$store.dispatch(ROOT_ACTIONS.clearError);
    }
  }
}
</script>
