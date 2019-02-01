import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { findUserHandler } from "./find-user";
import { onAuthCreateHandler, onAuthDeleteHandler } from "./on-auth";

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

// Auth
export const onAuthCreate = functions.auth.user().onCreate(onAuthCreateHandler);
export const onAuthDelete = functions.auth.user().onDelete(onAuthDeleteHandler);

export const findUser = functions.https.onCall(findUserHandler);
