import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { listUsersHandler } from "./list-users";
import { onChatRoomCreateHandler } from "./on-chat-create";

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

export const listUsers = functions.https.onCall(listUsersHandler);
export const onChatRoomCreate = functions.firestore
  .document("/chatrooms/{chatroomId}")
  .onCreate(onChatRoomCreateHandler);
