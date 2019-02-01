import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { CallableContext } from "firebase-functions/lib/providers/https";
import { USERS_COLLECTIONS } from "./collections";
import { logger } from "./helpers";

const log = logger("[listUsers]");

export async function listUsersHandler(
  data: { users: string[] },
  context: CallableContext
) {
  console.log("request", data);

  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated");
  }

  if (!data || !data.users || !Array.isArray(data.users)) {
    throw new functions.https.HttpsError("invalid-argument");
  }

  try {
    const docRefs = data.users.map(userId =>
      admin
        .firestore()
        .collection(USERS_COLLECTIONS)
        .doc(userId)
    );
    const results = await admin.firestore().getAll(...docRefs);
    return {
      users: results.map(snapshot => ({
        uid: snapshot.id,
        data: snapshot.exists ? snapshot.data() : null
      }))
    };
  } catch (error) {
    log("ERROR listUser", error.code, error.message);
    throw new functions.https.HttpsError("not-found");
  }
}
