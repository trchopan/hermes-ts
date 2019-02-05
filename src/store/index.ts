import Vue from "vue";
import Vuex from "vuex";
import rootStore from "./root.store";
import chatStore from "@/app/chat/chat.store";

Vue.use(Vuex);

export default new Vuex.Store({
  ...rootStore,
  modules: { [chatStore.namespace]: chatStore }
});
