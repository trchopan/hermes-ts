import Vue from "vue";
import VueRouter, { NavigationGuard, Route, RouteRecord } from "vue-router";
import { logger } from "@/app/shared/logger.helper";
import homeRoutes from "@/app/home/home.routes";
import authRoutes, { AUTH_ROUTE } from "@/app/auth/auth.routes";
import chatRoutes from "@/app/chat/chat.routes";

const log = logger("[vue-router]", "#960000");
export const checkMetaKey = (matched: RouteRecord[], key: string) =>
  matched.some(record => record.meta[key]);

export const globalGuard = (store: any): NavigationGuard => (
  to: Route,
  from: Route,
  next: any
): void => {
  log(`Navigating <${from.fullPath}> to <${to.fullPath}>`);
  if (checkMetaKey(to.matched, "requireAuth") && !store.state.user) {
    log("This route require authentication", to.name);
    log("Navigating to", AUTH_ROUTE);
    next(AUTH_ROUTE);
    return;
  }
  next();
};

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [homeRoutes, authRoutes, chatRoutes].flat()
});
