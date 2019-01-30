<template>
  <v-app :dark="darkTheme">
    <AppToolbar/>
    <AppDrawer/>
    <v-content>
      <v-container fluid fill-height>
        <AppLoadingDialog/>
        <AppErrorDialog/>
        <transition
          name="fade"
          mode="out-in"
        >
          <router-view/>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";
import { ROOT_ACTIONS } from "@/store/root.store";
import AppToolbar from "./AppToolbar.vue";
import AppDrawer from "./AppDrawer.vue";
import AppLoadingDialog from "./AppLoadingDialog.vue";
import AppErrorDialog from "./AppErrorDialog.vue";

@Component({
  name: "App",
  components: {
    AppToolbar,
    AppDrawer,
    AppLoadingDialog,
    AppErrorDialog
  }
})
export default class App extends Vue {
  @Getter("darkTheme")
  public darkTheme!: boolean;

  private created() {
    this.$store.dispatch(ROOT_ACTIONS.initializeApp);
    if (this.$vuetify.breakpoint.lgAndUp) {
      this.$store.dispatch(ROOT_ACTIONS.toggleDrawer);
    }
  }
}
</script>

<style lang="scss" src="@/assets/style.scss" />