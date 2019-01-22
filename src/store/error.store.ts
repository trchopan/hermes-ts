import { GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "./root.store";
import { logger } from "@/app/shared/logger.helper";

const log = logger("[errorStore]");

const namespace = "error";

export interface ErrorState {
  error: any[];
}

const initState: ErrorState = {
  error: []
};

export const ERROR_ACTIONS = {
  catchError: "error/catchError",
  dismissError: "error/dismissError",
  clearError: "error/clearError"
};

const getters: GetterTree<ErrorState, RootState> = {};

const actions: ActionTree<ErrorState, RootState> = {
  [ERROR_ACTIONS.catchError]: ({ commit }, error) => {
    commit("errorCatched", error);
  },
  [ERROR_ACTIONS.dismissError]: ({ commit }, errorCode) => {
    commit("errorDismissed", errorCode);
  },
  [ERROR_ACTIONS.clearError]: ({ commit }) => {
    commit("errorCleared");
  }
};

const mutations: MutationTree<ErrorState> = {
  errorCatched(state, error: Error) {
    state.error = state.error.concat(error);
    log("Error catched", error.message);
  },
  errorDismissed(state, errorIndex) {
    state.error = state.error.splice(errorIndex, 1);
    log("Error dismissed", errorIndex);
  },
  errorCleared(state) {
    state.error = [];
    log("Error cleared");
  }
};

export default {
  namespace,
  state: initState,
  getters,
  actions,
  mutations
};
