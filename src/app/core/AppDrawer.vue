<template>
  <v-navigation-drawer
    v-model="drawerStatus"
    app
    clipped
    width="240"
  >
    <v-list class="pa-0">
      <template v-for="(item, index) in drawerItems">
        <v-list-tile
          v-if="!item.children"
          :key="'drawer-' + item.name + index"
          :to="item.path"
        >
          <v-list-tile-action>
            <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group
          v-if="item.children"
          :key="'drawer-' + item.name + index"
        >
          <v-list-tile
            avatar
            slot="activator"
          >
            <v-list-tile-action>
              <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="(child, i) in item.children"
            :key="'child-' + item.name + child.name + i"
            :to="child.path"
          >
            <v-list-tile-action></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ child.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider/>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";
import { ILanguageMap, IMappedLanguage } from "@/plugins/translate";
import { ROOT_ACTIONS } from "@/store/root.store";
import { ILanguageSetting } from "@/store/root.models";
import { LANGUAGES_MAP } from "@/app/core/app.models";
import { CHAT_ROUTE } from "@/app/chat/chat.routes";

export const mapper = (item: IDrawerItem, languageMap: IMappedLanguage) => ({
  ...item,
  name: languageMap[item.name]
});

export function reducer(
  items: IDrawerItem[],
  itemsLanguage: IMappedLanguage
): IDrawerItem[] {
  const result = items.reduce((acc, cur) => {
    if (!cur.children) {
      return acc.concat(mapper(cur, itemsLanguage));
    } else {
      const children = reducer(cur.children, itemsLanguage);
      return acc.concat({ ...mapper(cur, itemsLanguage), children });
    }
  }, new Array<IDrawerItem>());
  return result;
}

export interface IDrawerItem {
  path?: string;
  name: string;
  icon?: string;
  children?: IDrawerItem[];
}

export const DRAWER_ITEMS: IDrawerItem[] = [
  { path: "/", name: "home", icon: "home" },
  {
    name: "playground",
    icon: "dashboard",
    children: [
      { path: CHAT_ROUTE, name: "chat" },
      { path: "machine-learning", name: "machineLearning" }
    ]
  }
];

@Component({
  name: "AppDrawer"
})
export default class AppDrawer extends Vue {
  @State("language")
  public language!: ILanguageSetting;
  @State("drawerOpen")
  public drawerOpen!: boolean;

  get $t(): IMappedLanguage {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }
  get drawerItems(): IDrawerItem[] {
    return reducer(DRAWER_ITEMS, this.$t);
  }
  get drawerStatus(): boolean {
    return this.drawerOpen;
  }
  set drawerStatus(state: boolean) {
    if (state !== this.drawerOpen) {
      this.$store.dispatch(ROOT_ACTIONS.toggleDrawer);
    }
  }
}
</script>
