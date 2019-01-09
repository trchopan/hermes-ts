import Vue from "vue";
import Vuex from "vuex";
import rootStore from "./root.store";

Vue.use(Vuex);

export default new Vuex.Store(rootStore);
