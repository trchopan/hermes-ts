import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { onAuthCreateHandler, onAuthDeleteHandler } from "./on-auth";
import { findUserHandler } from "./find-user";
import { listUsersHandler } from "./list-users";

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

// Auth
export const onAuthCreate = functions.auth.user().onCreate(onAuthCreateHandler);
export const onAuthDelete = functions.auth.user().onDelete(onAuthDeleteHandler);

export const findUser = functions.https.onCall(findUserHandler);
export const listUser = functions.https.onCall(listUsersHandler);
