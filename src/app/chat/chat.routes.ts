import { RouteConfig } from "vue-router";
import Chat from "./Chat.vue";
import ChatRoom from "./ChatRoom.vue";
import ChatUser from "./ChatUser.vue";
import { CHAT_ROUTE, CHAT_ROOM_ROUTE, CHAT_USER_ROUTE } from "./chat.models";

export default [
  {
    path: CHAT_ROUTE,
    name: "chat",
    component: Chat,
    meta: {
      requireAuth: true
    },
    children: [
      { path: CHAT_ROOM_ROUTE, name: "chat-room", component: ChatRoom },
      { path: CHAT_USER_ROUTE, name: "chat-user", component: ChatUser }
    ]
  }
] as RouteConfig[];
