export const ACTIONS = {
  initLocalStorage: "initLocalStorage",
  catchError: "catchError",
  dismissError: "dismissError",
  clearError: "clearError",
  changeLanguage: "changeLanguage",
  changeTheme: "changeTheme",
  toggleDrawer: "toggleDrawer"
};

import { logger } from "@/app/shared/logger.helper";
import { LANGUAGE_SETTINGS, THEME_SETTINGS, ISettings } from "./root.models";
import { StoreOptions } from "vuex";

const log = logger("[rootStore]");

export interface RootState {
  error: any[];
  localStorageStatus: boolean;
  theme: ISettings;
  drawerOpen: boolean;
  language: ISettings;
}

const rootStore: StoreOptions<RootState> = {
  state: {
    error: [],
    localStorageStatus: false,
    theme: THEME_SETTINGS[0], // Light theme
    drawerOpen: false,
    language: LANGUAGE_SETTINGS[0] // Vietnamese
  },
  getters: {
    error: state => state.error,
    theme: state => state.theme,
    darkTheme: state =>
      state.theme.value === THEME_SETTINGS[0].value ? false : true,
    drawerOpen: state => state.drawerOpen,
    language: state => state.language
  },
  actions: {
    [ACTIONS.initLocalStorage]: ({ commit, dispatch }) => {
      if (window.localStorage !== undefined) {
        commit("localStorageAvailable");
        const theme = localStorage.getItem("theme");
        if (theme) {
          dispatch(ACTIONS.changeTheme, JSON.parse(theme));
        }
        const language = localStorage.getItem("language");
        if (language) {
          dispatch(ACTIONS.changeLanguage, JSON.parse(language));
        }
      } else {
        log("No Web Storage support");
      }
    },
    [ACTIONS.catchError]: ({ commit }, error) => {
      commit("errorCatched", error);
    },
    [ACTIONS.dismissError]: ({ commit }, errorCode) => {
      commit("errorDismissed", errorCode);
    },
    [ACTIONS.clearError]: ({ commit }) => {
      commit("errorCleared");
    },
    [ACTIONS.changeLanguage]: ({ commit }, language) => {
      commit("languageChanged", language);
    },
    [ACTIONS.changeTheme]: ({ commit }, theme) => commit("themeChanged", theme),
    [ACTIONS.toggleDrawer]: ({ commit }) => commit("drawerToggled")
  },
  mutations: {
    localStorageAvailable(state) {
      state.localStorageStatus = true;
    },
    errorCatched(state, error) {
      state.error = state.error.concat(error);
      log("Error catched", error);
    },
    errorDismissed(state, errorIndex) {
      state.error = state.error.splice(errorIndex, 1);
      log("Error dismissed", errorIndex);
    },
    errorCleared(state) {
      state.error = [];
      log("Error cleared");
    },
    themeChanged(state, theme) {
      state.theme = theme;
      if (state.localStorageStatus) {
        localStorage.setItem("theme", JSON.stringify(theme));
      }
      log("Theme changed", theme);
    },
    languageChanged(state, language) {
      state.language = language;
      if (state.localStorageStatus) {
        localStorage.setItem("language", JSON.stringify(language));
      }
      log("Language changed", language);
    },
    drawerToggled(state) {
      state.drawerOpen = !state.drawerOpen;
      log("Drawer toggled", state.drawerOpen);
    }
  }
};

export default rootStore;
