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
import Component from "vue-class-component";
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

@Component({
  name: "AppDrawer"
})
export default class AppDrawer extends Vue {
  get $t(): { [key: string]: string } {
    return this.$translate(LANGUAGES_MAP, this.$store.state.language.value);
  }
  get drawerOpen(): boolean {
    return this.$store.getters.drawerOpen;
  }
  set drawerOpen(state: boolean) {
    if (state !== this.$store.state.drawerOpen) {
      this.$store.dispatch(ACTIONS.toggleDrawer);
    }
  }
  get drawerItems(): Array<{ path: string; name: string; icon: string }> {
    return DRAWER_ITEMS.map(x => ({ ...x, name: this.$t[x.name] }));
  }
}
</script>