import { GetterTree, ActionTree, MutationTree } from "vuex";
import { logger } from "@/app/shared/logger.helper";
import {
  LANGUAGE_SETTINGS,
  THEME_SETTINGS,
  IThemeSetting,
  ILanguageSetting,
  IError,
  IUser,
  IProfile,
  COMBINED_LANGUAGES_MAP,
  IMappedLanguage
} from "./root.models";

const log = logger("[rootStore]");
const logError = logger("[rootStore]", "#ff3333");

export const ROOT_ACTIONS = {
  initializeApp: "initializeApp",
  changeLanguage: "changeLanguage",
  changeTheme: "changeTheme",
  toggleDrawer: "toggleDrawer",
  changeUser: "changeUser",
  changeUserProfile: "changeUserProfile",
  changeUsersList: "changeUsersList",
  changeLoadingMessage: "changeLoadingMessage",
  finishLoading: "finishLoading",
  changeError: "changeError",
  clearError: "clearError"
};

export interface RootState {
  localStorageStatus: boolean;
  theme: IThemeSetting;
  drawerOpen: boolean;
  language: ILanguageSetting;
  user: IUser | null;
  userProfile: IProfile | null;
  usersList: IUser[] | null;
  loadingMessage: string | null;
  error: IError | null;
}

// const rootStore: StoreOptions<RootState> = {
export const initState: RootState = {
  localStorageStatus: false,
  theme: THEME_SETTINGS[0], // Light theme
  drawerOpen: false,
  language: LANGUAGE_SETTINGS[0], // Vietnamese
  user: null,
  userProfile: null,
  usersList: null,
  loadingMessage: null,
  error: null
};

export const getters: GetterTree<RootState, RootState> = {
  darkTheme: (state) =>
    state.theme.value === THEME_SETTINGS[0].value ? false : true,
  appLoading: (state) => !!state.loadingMessage,
  appErroring: (state) => !!state.error,
  $t: (state) =>
    Object.keys(COMBINED_LANGUAGES_MAP).reduce(
      (acc, key) => {
        acc[key] =
          COMBINED_LANGUAGES_MAP[key][state.language.value] ||
          COMBINED_LANGUAGES_MAP[key].en;
        return acc;
      },
      {} as IMappedLanguage
    )
};

export const actions: ActionTree<RootState, RootState> = {
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
  [ROOT_ACTIONS.changeUser]: ({ commit }, user: IUser | null) =>
    commit("userChanged", user),
  [ROOT_ACTIONS.changeUserProfile]: ({ commit }, userProfile: IProfile) =>
    commit("userProfileChanged", userProfile),
  [ROOT_ACTIONS.changeUsersList]: ({ commit }, usersList: IUser[]) => {
    commit("usersListChanged", usersList);
  },
  [ROOT_ACTIONS.changeLoadingMessage]: ({ commit }, message: string | null) =>
    commit("loadingMessageChanged", message),
  [ROOT_ACTIONS.finishLoading]: ({ commit }) =>
    commit("loadingMessageChanged", null),
  [ROOT_ACTIONS.changeError]: ({ commit, dispatch }, error: IError | null) => {
    dispatch(ROOT_ACTIONS.finishLoading);
    commit("errorChanged", error);
  },
  [ROOT_ACTIONS.clearError]: ({ commit }) => commit("errorChanged", null)
};

export const mutations: MutationTree<RootState> = {
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
  userChanged(state, user: IUser | null) {
    state.user = user;
    log("User changed", state.user);
  },
  userProfileChanged(state, userProfile: IProfile) {
    state.userProfile = userProfile;
    log("User profile changed", state.userProfile);
  },
  usersListChanged(state, usersList: IUser[]) {
    state.usersList = usersList;
    log("Users list changed", state.usersList);
  },
  loadingMessageChanged(state, message: string | null) {
    state.loadingMessage = message;
    log("Loading message changed", state.loadingMessage);
  },
  errorChanged(state, error: IError | null) {
    state.error = error;
    logError(
      "Error changed",
      state.error ? `${state.error.code}: ${state.error.message}` : null
    );
  }
};

export default {
  state: initState,
  getters,
  actions,
  mutations
};
