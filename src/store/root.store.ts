import { GetterTree, ActionTree, MutationTree } from "vuex";
import {
  LANGUAGE_SETTINGS,
  THEME_SETTINGS,
  IThemeSetting,
  ILanguageSetting,
  IError,
  IUser,
  IProfile,
  COMBINED_LANGUAGES_MAP,
  IMappedLanguage,
  USERS_COLLECTION,
  parseUser
} from "./root.models";
import { fireStore, fireFunctions } from "@/firebase";

export const rootStoreNamespace = "[root]";

export const ROOT_ACTIONS = {
  initializeApp: "initializeApp",
  changeLanguage: "changeLanguage",
  changeTheme: "changeTheme",
  toggleDrawer: "toggleDrawer",
  changeUser: "changeUser",
  editUser: "editUser",
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
  isLoggedIn: boolean;
  user: IUser | null;
  usersList: IUser[] | null;
  loadingMessage: string | null;
  error: IError | null;
}

export const initState: RootState = {
  localStorageStatus: false,
  theme: THEME_SETTINGS[0], // Light theme
  drawerOpen: false,
  language: LANGUAGE_SETTINGS[0], // Vietnamese
  isLoggedIn: false,
  user: null,
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

export const actions = (
  editUserCallable: firebase.functions.HttpsCallable
): ActionTree<RootState, RootState> => {
  let userProfileSnap = () => {};

  return {
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
    [ROOT_ACTIONS.changeUser]: (
      { commit, rootGetters },
      user: firebase.User | null
    ) => {
      if (!user) {
        commit(ROOT_MUTATIONS.userChanged, null);
      } else {
        commit(ROOT_MUTATIONS.userChanged, parseUser(user.uid, user));
        userProfileSnap();
        userProfileSnap = fireStore
          .collection(USERS_COLLECTION)
          .doc(user.uid)
          .onSnapshot((userSnap) => {
            if (userSnap.exists) {
              const parsedUser = parseUser(userSnap.id, userSnap.data());
              commit(ROOT_MUTATIONS.userChanged, parsedUser);
            } else {
              const error = { message: rootGetters.$t.errorGettingUser };
              commit(ROOT_ACTIONS.changeError, error);
            }
          });
      }
    },
    [ROOT_ACTIONS.editUser]: async (
      { commit, dispatch, rootState, rootGetters },
      userProfile: IProfile
    ) => {
      if (!rootState.user) {
        return;
      }
      try {
        await editUserCallable(userProfile);
        commit(ROOT_MUTATIONS.userChanged, {
          ...rootState.user,
          ...userProfile
        });
      } catch (error) {
        error.message = rootGetters.$t.errorEditingUser;
        dispatch(ROOT_ACTIONS.changeError, error);
      }
    },
    [ROOT_ACTIONS.changeLoadingMessage]: ({ commit }, message: string | null) =>
      commit(ROOT_MUTATIONS.loadingMessageChanged, message),
    [ROOT_ACTIONS.finishLoading]: ({ commit }) =>
      commit(ROOT_MUTATIONS.loadingMessageChanged, null),
    [ROOT_ACTIONS.changeError]: (
      { commit, dispatch },
      error: IError | null
    ) => {
      dispatch(ROOT_ACTIONS.finishLoading);
      commit(
        ROOT_MUTATIONS.errorChanged,
        error ? { code: error.code, message: error.message } : null
      );
    },
    [ROOT_ACTIONS.clearError]: ({ commit }) =>
      commit(ROOT_MUTATIONS.errorChanged, null)
  };
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
  [ROOT_MUTATIONS.usersListChanged](state, usersList: IUser[]) {
    state.usersList = usersList;
  },
  [ROOT_MUTATIONS.loadingMessageChanged](state, message: string | null) {
    state.loadingMessage = message;
  },
  [ROOT_MUTATIONS.errorChanged](state, error: IError | null) {
    state.error = error;
  }
};

export default {
  state: initState,
  getters,
  actions: actions(fireFunctions.httpsCallable("editUser")),
  mutations
};
