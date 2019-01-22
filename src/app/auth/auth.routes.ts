import { RouteConfig } from "vue-router";
import Auth from "./Auth.vue";
import AuthSignUpEmail from "./AuthSignUpEmail.vue";
import AuthSignInEmail from "./AuthSignInEmail.vue";

export const AUTH_ROUTE = "/auth";
export const AUTH_SIGN_UP_EMAIL_ROUTE = "/sign-up-email";
export const AUTH_SIGN_IN_EMAIL_ROUTE = "/sign-in-email";

export default [
  {
    path: AUTH_ROUTE,
    name: "auth",
    component: Auth
  },
  {
    path: AUTH_SIGN_UP_EMAIL_ROUTE,
    name: "sign-up-email",
    component: AuthSignUpEmail
  },
  {
    path: AUTH_SIGN_IN_EMAIL_ROUTE,
    name: "sign-in-email",
    component: AuthSignInEmail
  }
] as RouteConfig[];
