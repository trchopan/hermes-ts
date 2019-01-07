import Home from "./Home.vue";
import { RouteConfig } from "vue-router";

export const home: RouteConfig = {
  path: "/",
  name: "home",
  component: Home
};
