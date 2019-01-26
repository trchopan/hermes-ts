import { RouteConfig } from "vue-router";
import Chat from "./Chat.vue";
import ChatRoom from "./ChatRoom.vue";

export const CHAT_ROUTE = "/chat";
export const CHAT_ROOM_ROUTE = "room/:id";

export default [
  {
    path: CHAT_ROUTE,
    name: "chat",
    component: Chat,
    children: [
      { path: CHAT_ROOM_ROUTE, name: "chat-room", component: ChatRoom }
    ]
  }
] as RouteConfig[];
