import Vue from "vue";
import Vuex from "vuex";
import { rootStore as _rootStore } from "./root.store";
import chatStore, { chatStoreNamespace } from "@/app/chat/chat.store";
import { loggerPlugin } from "./logger.plugin";
import { firebaseApp } from "@/firebase";

Vue.use(Vuex);

const rootStore = _rootStore(
  firebaseApp.firestore(),
  firebaseApp.functions().httpsCallable("editUser")
);

export default new Vuex.Store({
  ...rootStore,
  modules: { [chatStoreNamespace]: chatStore },
  plugins: process.env.NODE_ENV === "development" ? [loggerPlugin] : []
});
