import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { CallableContext } from "firebase-functions/lib/providers/https";
import { logger } from "./helpers";

const log = logger("[findUser]");

export async function findUserHandler(data: any, context: CallableContext) {
  log("requested", data);

  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated");
  }

  if (!data.email && !data.phoneNumber) {
    throw new functions.https.HttpsError("invalid-argument");
  }

  try {
    if (data.email) {
      const foundEmailUser = await admin.auth().getUserByEmail(data.email);
      return { user: foundEmailUser.uid };
    } else {
      const foundPhoneUser = await admin
        .auth()
        .getUserByPhoneNumber(data.phoneNumber);
      return { user: foundPhoneUser.uid };
    }
  } catch (error) {
    log("ERROR findUser", error.code, error.message);
    throw new functions.https.HttpsError("not-found");
  }
}
