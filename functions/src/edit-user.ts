import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { CallableContext } from "firebase-functions/lib/providers/https";
import { logger } from "./helpers";
import { USERS_COLLECTIONS } from "./collections";

const log = logger("[editUser]");

export async function editUserHandler(data: any, context: CallableContext) {
  log("requested", data);

  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated");
  }

  if (!data.displayName && !data.photoURL) {
    throw new functions.https.HttpsError("invalid-argument");
  }

  try {
    const details = {
      displayName: data.displayName,
      photoURL: data.photoURL
    };
    await admin
      .firestore()
      .collection(USERS_COLLECTIONS)
      .doc(context.auth.uid)
      .update(details);
    return;
  } catch (error) {
    log("ERROR", error.code, error.message);
    throw new functions.https.HttpsError("internal");
  }
}
