import { RouteConfig } from "vue-router";
import Auth from "./Auth.vue";
import AuthSignUpEmail from "./AuthSignUpEmail.vue";
import AuthSignInEmail from "./AuthSignInEmail.vue";
import AuthSignInPhone from "./AuthSignInPhone.vue";
import AuthSignOut from "./AuthSignOut.vue";
import {
  AUTH_ROUTE,
  AUTH_SIGN_UP_EMAIL_ROUTE,
  AUTH_SIGN_IN_EMAIL_ROUTE,
  AUTH_SIGN_IN_PHONE_ROUTE,
  AUTH_SIGN_OUT_ROUTE
} from "./auth.models";

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
  },
  {
    path: AUTH_SIGN_IN_PHONE_ROUTE,
    name: "sign-in-phone",
    component: AuthSignInPhone
  },
  {
    path: AUTH_SIGN_OUT_ROUTE,
    name: "sign-out",
    component: AuthSignOut
  }
] as RouteConfig[];
