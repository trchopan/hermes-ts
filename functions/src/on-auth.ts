import * as admin from "firebase-admin";
import { logger } from "./helpers";
import { UserRecord } from "firebase-functions/lib/providers/auth";
import { EventContext } from "firebase-functions";

export const USERS_COLLECTIONS = "users";

const log = logger("[onAuth]");

export function onAuthDeleteHandler(
  user: UserRecord,
  context: EventContext
): Promise<FirebaseFirestore.WriteResult> {
  log("delete", user.uid);
  return admin
    .firestore()
    .collection(USERS_COLLECTIONS)
    .doc(user.uid)
    .delete();
}

export function onAuthCreateHandler(user: UserRecord, context: EventContext) {
  log("create", user.uid);
  return admin
    .firestore()
    .collection(USERS_COLLECTIONS)
    .doc(user.uid)
    .set({ displayName: "", photoURL: "", init: false });
}
