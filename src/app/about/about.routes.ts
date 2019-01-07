import About from "./About.vue";
import { RouteConfig } from "vue-router";

export const about: RouteConfig = {
  path: "/about",
  name: "about",
  component: About
};
