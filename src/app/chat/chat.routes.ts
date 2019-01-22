import { RouteConfig } from "vue-router";
import Chat from "./Chat.vue";

export const CHAT_ROUTE = "/chat";

export default [
  {
    path: CHAT_ROUTE,
    name: "chat",
    component: Chat
  }
] as RouteConfig[];
