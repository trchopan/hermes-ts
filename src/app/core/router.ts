import Vue from "vue";
import VueRouter, { NavigationGuard, Route, RouteRecord } from "vue-router";
import homeRoutes from "@/app/home/home.routes";
import aboutRoutes from "@/app/about/about.routes";
import { logger } from "@/app/shared/helpers/logger.helper";

const log = logger("[vue-router]");
const checkMetaKey = (matched: RouteRecord[], key: string) =>
  matched.some((record) => record.meta[key]);

export const globalGuard = (store: any): NavigationGuard => (
  to: Route,
  from: Route,
  next: any
): void => {
  log("Navigating", to.path, from.path);
  next();
};

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [homeRoutes, aboutRoutes]
});
