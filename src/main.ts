import Vue, { CreateElement } from "vue";
import "@/class-component-hooks";
import "@/plugins";
import "@/filters";
import App from "@/app/core/App.vue";
import router, { globalGuard } from "@/router";
import store from "@/store";
import { ROOT_ACTIONS } from "@/store/root.store";
import { firebaseApp } from "./firebase";

Vue.config.productionTip = false;
// Vue.config.devtools = false;

// tslint:disable-next-line:no-console
console.log(`version %c${process.env.VUE_APP_VERSION}`, "color: #ed1d24;");
// tslint:disable-next-line:no-console
console.log(`author %c${process.env.VUE_APP_AUTHOR}`, "color: #159cd8;");

router.beforeEach(globalGuard(store));

let inited = false;
firebaseApp.auth().onAuthStateChanged((user) => {
  store.dispatch(ROOT_ACTIONS.changeUser, user);
  if (!inited) {
    init();
  }
});

function init() {
  inited = true;
  new Vue({
    router,
    store,
    render: (h: CreateElement) => h(App)
  }).$mount("#app");
}
