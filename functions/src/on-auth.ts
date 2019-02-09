import * as admin from "firebase-admin";
import { logger } from "./helpers";
import { UserRecord } from "firebase-functions/lib/providers/auth";
import { EventContext } from "firebase-functions";
import { USERS_COLLECTIONS } from "./collections";

const log = logger("[onAuth]");

export async function onAuthDeleteHandler(
  user: UserRecord,
  context: EventContext
) {
  log("delete", user.uid);
  return await admin
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
    .set({
      displayName: "",
      phoneNumber: ""
    });
}
