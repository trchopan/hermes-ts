import Vue from "vue";
import "vuetify/src/stylus/app.styl";
import Vuetify from "vuetify";
import {
  VApp,
  VAvatar,
  VContainer,
  VContent,
  VLayout,
  VFlex,
  VCard,
  VCardText,
  VCardActions,
  VDivider,
  VForm,
  VTextField,
  VTooltip,
  VToolbar,
  VToolbarSideIcon,
  VToolbarTitle,
  VToolbarItems,
  VMenu,
  VMenuTransition,
  VNavigationDrawer,
  VList,
  VListTile,
  VListTileAvatar,
  VListTileContent,
  VListTileTitle,
  VListTileSubTitle,
  VListTileAction,
  VProgressLinear,
  VProgressCircular,
  VRating,
  VBtn,
  VFabTransition,
  VIcon,
  VSwitch,
  VSelect,
  VSpacer
  // transitions
} from "vuetify/lib";
import colors from "vuetify/es5/util/colors";
import { Ripple } from "vuetify/es5/directives";

const components = {
  VApp,
  VAvatar,
  VContainer,
  VContent,
  VLayout,
  VFlex,
  VCard,
  VCardText,
  VCardActions,
  VDivider,
  VForm,
  VTextField,
  VTooltip,
  VToolbar,
  VToolbarSideIcon,
  VToolbarTitle,
  VToolbarItems,
  VMenu,
  VMenuTransition,
  VNavigationDrawer,
  VList,
  VListTile,
  VListTileAvatar,
  VListTileContent,
  VListTileTitle,
  VListTileSubTitle,
  VListTileAction,
  VProgressLinear,
  VProgressCircular,
  VRating,
  VBtn,
  VFabTransition,
  VIcon,
  VSwitch,
  VSelect,
  VSpacer
  // transitions
};
const directives = {
  Ripple
};

Vue.use(Vuetify, {
  components,
  directives,
  theme: {
    secondary: colors.pink.accent2,
    accent: colors.indigo.base,
    warn: colors.red.accent2
  }
});
