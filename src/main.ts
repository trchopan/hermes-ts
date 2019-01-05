import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// tslint:disable-next-line:no-console
console.log(`version %c${process.env.VUE_APP_VERSION}`, "color: #ed1d24;");
// tslint:disable-next-line:no-console
console.log(`author %c${process.env.VUE_APP_AUTHOR}`, "color: #159cd8;");

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
