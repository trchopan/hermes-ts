import Vue from "vue";
import Vuex from "vuex";
import rootStore from "./root.store";
import chatStore, { chatStoreNamespace } from "@/app/chat/chat.store";
import { loggerPlugin } from "./logger.plugin";

Vue.use(Vuex);

export default new Vuex.Store({
  ...rootStore,
  modules: { [chatStoreNamespace]: chatStore },
  plugins: process.env.NODE_ENV === "development" ? [loggerPlugin] : []
});
