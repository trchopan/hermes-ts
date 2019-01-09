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
import { LanguageOptions, ThemeOptions } from "./root.models";
import { StoreOptions } from "vuex";

const log = logger("[rootStore]");

export interface RootState {
  error: any[];
  localStorageStatus: boolean;
  theme: ThemeOptions;
  drawerOpen: boolean;
  language: LanguageOptions;
}

const rootStore: StoreOptions<RootState> = {
  state: {
    error: [],
    localStorageStatus: false,
    theme: ThemeOptions.light,
    drawerOpen: false,
    language: LanguageOptions.vi
  },
  getters: {
    error: (state) => state.error,
    theme: (state) => state.theme,
    darkTheme: (state) => (state.theme === ThemeOptions.dark ? true : false),
    drawerOpen: (state) => state.drawerOpen,
    language: (state) => state.language
  },
  actions: {
    [ACTIONS.initLocalStorage]: ({ commit, dispatch }) => {
      if (window.localStorage !== undefined) {
        commit("localStorageAvailable");
        const theme = localStorage.getItem("theme");
        dispatch("changeTheme", theme);

        const language = localStorage.getItem("language");
        if (language) {
          commit("languageChanged", language);
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
    localStorageAvailable(state) {
      state.localStorageStatus = true;
    },
    themeChanged(state, theme) {
      state.theme = theme;
      if (state.localStorageStatus) {
        localStorage.setItem("theme", theme);
      }
      log("Theme changed", theme);
    },
    languageChanged(state, language) {
      state.language = language;
      if (state.localStorageStatus) {
        localStorage.setItem("language", language);
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
