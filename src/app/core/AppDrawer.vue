<template>
  <v-navigation-drawer
    v-model="drawerOpen"
    app
    clipped
    width="230"
  >
    <v-list class="pa-0">
      <v-list-tile
        v-for="(item, index) in drawerItems"
        :key="'drawer-' + item.name + '-' + index"
        avatar
        :to="item.path"
      >
        <v-list-tile-avatar>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
      </v-list-tile>
      <v-divider/>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { ILanguageMap } from "@/plugins/translate";
import { ACTIONS } from "@/store/root.store";

export const LANGUAGES_MAP: ILanguageMap = {
  home: { vi: "Trang chủ", en: "Home" },
  dashboard: { vi: "Bảng điều khiển", en: "Dashboard" },
  user: { vi: "Quản lý người dùng", en: "User management" },
  about: { vi: "Về chúng tôi", en: "About" }
};

export const DRAWER_ITEMS = [
  { path: "/", name: "home", icon: "home" },
  { path: "/dashboard", name: "dashboard", icon: "dashboard" },
  { path: "/user", name: "user", icon: "account_circle" },
  { path: "/about", name: "about", icon: "" }
];

export default Vue.extend({
  name: "AppNavigationDrawer",
  computed: {
    $t(): { [key: string]: string } {
      return this.$translate(LANGUAGES_MAP, this.$store.getters.language.value);
    },
    drawerOpen: {
      get(this: Vue): boolean {
        return this.$store.getters.drawerOpen;
      },
      set(state: boolean): void {
        if (state !== this.$store.state.drawerOpen) {
          this.$store.dispatch(ACTIONS.toggleDrawer);
        }
      }
    },
    drawerItems(): Array<{ path: string; name: string; icon: string }> {
      return DRAWER_ITEMS.map((x) => ({ ...x, name: this.$t[x.name] }));
    }
  }
});
</script>
