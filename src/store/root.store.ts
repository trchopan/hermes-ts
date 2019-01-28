import { StoreOptions } from "vuex";
import { logger } from "@/app/shared/logger.helper";
import {
  LANGUAGE_SETTINGS,
  THEME_SETTINGS,
  IThemeSetting,
  ILanguageSetting
} from "./root.models";
import errorStore from "./error.store";

const log = logger("[rootStore]");

export const ROOT_ACTIONS = {
  initializeApp: "initializeApp",
  changeLanguage: "changeLanguage",
  changeTheme: "changeTheme",
  toggleDrawer: "toggleDrawer",
  registerRecaptcha: "registerRecaptcha",
  changeUser: "changeUser",
  changeLoadingMessage: "changeLoadingMessage",
  finishLoading: "finishLoading",
  changeErrorMessage: "changeErrorMessage",
  clearErrorMessage: "clearErrorMessage"
};

export interface IRecaptchaData {
  verifier: firebase.auth.RecaptchaVerifier;
  widgetId: number;
  token: string;
}

export interface IUser {
  uid: string;
  email?: string;
  phone?: string;
}

export interface RootState {
  localStorageStatus: boolean;
  theme: IThemeSetting;
  drawerOpen: boolean;
  language: ILanguageSetting;
  recaptcha: IRecaptchaData | undefined;
  user: firebase.User | null;
  loadingMessage: string | null;
  errorMessage: string | null;
}

const rootStore: StoreOptions<RootState> = {
  state: {
    localStorageStatus: false,
    theme: THEME_SETTINGS[0], // Light theme
    drawerOpen: false,
    language: LANGUAGE_SETTINGS[0], // Vietnamese
    recaptcha: undefined,
    user: null,
    loadingMessage: null,
    errorMessage: null
  },
  getters: {
    darkTheme: state =>
      state.theme.value === THEME_SETTINGS[0].value ? false : true,
    appLoading: state => !!state.loadingMessage,
    appErroring: state => !!state.errorMessage
  },
  actions: {
    [ROOT_ACTIONS.initializeApp]: ({ commit, dispatch }) => {
      if (window.localStorage !== undefined) {
        commit("localStorageAvailable");
        const theme = localStorage.getItem("theme");
        if (theme) {
          dispatch(ROOT_ACTIONS.changeTheme, JSON.parse(theme));
        }
        const language = localStorage.getItem("language");
        if (language) {
          dispatch(ROOT_ACTIONS.changeLanguage, JSON.parse(language));
        }
      } else {
        log("No Web Storage support");
      }
    },
    [ROOT_ACTIONS.changeLanguage]: ({ commit }, language: ILanguageSetting) => {
      commit("languageChanged", language);
    },
    [ROOT_ACTIONS.changeTheme]: ({ commit }, theme) =>
      commit("themeChanged", theme),
    [ROOT_ACTIONS.toggleDrawer]: ({ commit }) => commit("drawerToggled"),
    [ROOT_ACTIONS.registerRecaptcha]: ({ commit }, data: IRecaptchaData) =>
      commit("captchaTokenRegistered", data),
    [ROOT_ACTIONS.changeUser]: ({ commit }, user: firebase.User) =>
      commit("userChanged", user),
    [ROOT_ACTIONS.changeLoadingMessage]: ({ commit }, message: string | null) =>
      commit("loadingMessageChanged", message),
    [ROOT_ACTIONS.finishLoading]: ({ commit }) =>
      commit("loadingMessageChanged", null),
    [ROOT_ACTIONS.changeErrorMessage]: (
      { commit, dispatch },
      message: string | null
    ) => {
      dispatch(ROOT_ACTIONS.finishLoading);
      commit("errorMessageChanged", message);
    },
    [ROOT_ACTIONS.clearErrorMessage]: ({ commit, dispatch }) => {
      dispatch(ROOT_ACTIONS.finishLoading);
      commit("errorMessageChanged", null);
    }
  },
  mutations: {
    localStorageAvailable(state) {
      state.localStorageStatus = true;
      log("LocalStorage available");
    },
    themeChanged(state, theme: IThemeSetting) {
      state.theme = theme;
      if (state.localStorageStatus) {
        localStorage.setItem("theme", JSON.stringify(theme));
      }
      log("Theme changed", theme);
    },
    languageChanged(state, language: ILanguageSetting) {
      state.language = language;
      if (state.localStorageStatus) {
        localStorage.setItem("language", JSON.stringify(language));
      }
      log("Language changed", language);
    },
    drawerToggled(state) {
      state.drawerOpen = !state.drawerOpen;
      log("Drawer toggled", state.drawerOpen);
    },
    captchaTokenRegistered(state, data: IRecaptchaData) {
      state.recaptcha = data;
      log("Captcha data registered", state.recaptcha);
    },
    userChanged(state, user: firebase.User) {
      state.user = user;
      log("User changed", state.user);
    },
    loadingMessageChanged(state, message: string | null) {
      state.loadingMessage = message;
      log("Loading message changed", state.loadingMessage);
    },
    errorMessageChanged(state, message: string | null) {
      state.errorMessage = message;
      log("Error message changed", state.errorMessage);
    }
  },
  modules: {
    errorStore
  }
};

export default rootStore;
