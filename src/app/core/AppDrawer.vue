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
import { State, Getter } from "vuex-class";
import { ROOT_ACTIONS } from "@/store/root.store";
import { IMappedLanguage } from "@/store/root.models";
import { IDrawerItem, DRAWER_ITEMS } from "@/app/core/app.models";

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

@Component({
  name: "AppDrawer"
})
export default class AppDrawer extends Vue {
  @Getter
  public $t!: IMappedLanguage;
  @State("drawerOpen")
  public drawerOpen!: boolean;

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
