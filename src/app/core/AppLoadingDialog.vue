<template>
  <v-dialog
    v-model="appLoading"
    persistent
    max-width="300"
  >
    <v-card
      class="elevation-12"
      color="primary"
      dark
    >
      <v-card-text>
        {{ loadingMessage }}
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter } from "vuex-class";

@Component({
  name: "AppLoadingDialog"
})
export default class AppLoadingDialog extends Vue {
  @State("loadingMessage")
  public loadingMessage!: string | null;
  @Getter("appLoading")
  public appLoading!: boolean;
}
</script>
