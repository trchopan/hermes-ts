<template>
  <v-app :dark="darkTheme">
    <AppToolbar/>
    <AppDrawer/>
    <v-content>
      <v-container fluid>
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
import { ACTIONS } from "@/store/root.store";
import AppToolbar from "./AppToolbar.vue";
import AppDrawer from "./AppDrawer.vue";

@Component({
  name: "App",
  components: {
    AppToolbar,
    AppDrawer
  }
})
export default class App extends Vue {
  @Getter("darkTheme")
  public darkTheme!: boolean;

  private created() {
    this.$store.dispatch(ACTIONS.initializeApp);
    if (this.$vuetify.breakpoint.lgAndUp) {
      this.$store.dispatch(ACTIONS.toggleDrawer);
    }
  }
}
</script>

<style lang="scss" src="@/assets/style.scss" />