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

export const rootStoreNamespace = "[root]";

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

export const ROOT_MUTATIONS = {
  localStorageAvailable: "localStorageAvailable",
  themeChanged: "themeChanged",
  languageChanged: "languageChanged",
  drawerToggled: "drawerToggled",
  userChanged: "userChanged",
  userProfileChanged: "userProfileChanged",
  usersListChanged: "usersListChanged",
  loadingMessageChanged: "loadingMessageChanged",
  errorChanged: "errorChange"
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
      commit(ROOT_MUTATIONS.localStorageAvailable, true);
      const theme = localStorage.getItem("theme");
      if (theme) {
        dispatch(ROOT_ACTIONS.changeTheme, JSON.parse(theme));
      }
      const language = localStorage.getItem("language");
      if (language) {
        dispatch(ROOT_ACTIONS.changeLanguage, JSON.parse(language));
      }
    } else {
      commit(ROOT_MUTATIONS.localStorageAvailable, true);
    }
  },
  [ROOT_ACTIONS.changeLanguage]: ({ commit }, language: ILanguageSetting) => {
    commit(ROOT_MUTATIONS.languageChanged, language);
  },
  [ROOT_ACTIONS.changeTheme]: ({ commit }, theme) =>
    commit(ROOT_MUTATIONS.themeChanged, theme),
  [ROOT_ACTIONS.toggleDrawer]: ({ commit }) =>
    commit(ROOT_MUTATIONS.drawerToggled),
  [ROOT_ACTIONS.changeUser]: ({ commit }, user: IUser | null) =>
    commit(ROOT_MUTATIONS.userChanged, user),
  [ROOT_ACTIONS.changeUserProfile]: ({ commit }, userProfile: IProfile) =>
    commit(ROOT_MUTATIONS.userProfileChanged, userProfile),
  [ROOT_ACTIONS.changeLoadingMessage]: ({ commit }, message: string | null) =>
    commit(ROOT_MUTATIONS.loadingMessageChanged, message),
  [ROOT_ACTIONS.finishLoading]: ({ commit }) =>
    commit(ROOT_MUTATIONS.loadingMessageChanged, null),
  [ROOT_ACTIONS.changeError]: ({ commit, dispatch }, error: IError | null) => {
    dispatch(ROOT_ACTIONS.finishLoading);
    commit(ROOT_MUTATIONS.errorChanged, error);
  },
  [ROOT_ACTIONS.clearError]: ({ commit }) =>
    commit(ROOT_MUTATIONS.errorChanged, null)
};

export const mutations: MutationTree<RootState> = {
  [ROOT_MUTATIONS.localStorageAvailable](state, status) {
    state.localStorageStatus = status;
  },
  [ROOT_MUTATIONS.themeChanged](state, theme: IThemeSetting) {
    state.theme = theme;
    if (state.localStorageStatus) {
      localStorage.setItem("theme", JSON.stringify(theme));
    }
  },
  [ROOT_MUTATIONS.languageChanged](state, language: ILanguageSetting) {
    state.language = language;
    if (state.localStorageStatus) {
      localStorage.setItem("language", JSON.stringify(language));
    }
  },
  [ROOT_MUTATIONS.drawerToggled](state) {
    state.drawerOpen = !state.drawerOpen;
  },
  [ROOT_MUTATIONS.userChanged](state, user: IUser | null) {
    state.user = user;
  },
  [ROOT_MUTATIONS.userProfileChanged](state, userProfile: IProfile) {
    state.userProfile = userProfile;
  },
  [ROOT_MUTATIONS.usersListChanged](state, usersList: IUser[]) {
    state.usersList = usersList;
  },
  [ROOT_MUTATIONS.loadingMessageChanged](state, message: string | null) {
    state.loadingMessage = message;
  },
  [ROOT_MUTATIONS.errorChanged](state, error: IError | null) {
    state.error = state.error
      ? { code: state.error.code, message: state.error.message }
      : null;
  }
};

export default {
  state: initState,
  getters,
  actions,
  mutations
};
