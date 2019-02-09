import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { CallableContext } from "firebase-functions/lib/providers/https";
import { logger } from "./helpers";

const log = logger("[listUsers]");

export async function listUsersHandler(
  data: { users: string[] },
  context: CallableContext
) {
  log("request", data);

  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated");
  }

  if (!data || !data.users || !Array.isArray(data.users)) {
    throw new functions.https.HttpsError("invalid-argument");
  }

  try {
    const userRecs = data.users.map((userId) => admin.auth().getUser(userId));
    const result = await Promise.all(userRecs);
    return result.map((user) => ({
      uid: user.uid,
      email: user.email || null,
      phoneNumber: user.phoneNumber || null
    }));
  } catch (error) {
    log("ERROR listUser", error.code, error.message);
    throw new functions.https.HttpsError("not-found");
  }
}
