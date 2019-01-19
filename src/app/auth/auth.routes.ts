import Auth from "./Auth.vue";
import { RouteConfig } from "vue-router";

export const AUTH_ROUTE = "/auth";

export default [
  {
    path: AUTH_ROUTE,
    name: "auth",
    component: Auth
  }
] as RouteConfig[];
