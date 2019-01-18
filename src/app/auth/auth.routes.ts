import Auth from "./Auth.vue";
import { RouteConfig } from "vue-router";

export default [{
  path: "/auth-system",
  name: "auth",
  component: Auth
}] as RouteConfig[];
