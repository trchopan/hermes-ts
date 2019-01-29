import * as admin from "firebase-admin";
import { CallableContext } from "firebase-functions/lib/providers/https";
import { ErrorCodes } from "./error-codes";

export async function listUsersHandler(data: any, context: CallableContext) {
  console.log("request listUsers", data);

  if (!context.auth) {
    return { code: ErrorCodes.notAuthorized };
  } else {
    try {
      const result = await admin.auth().listUsers();
      return {
        pageToken: result.pageToken,
        user: result.users.map(user => ({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          phoneNumber: user.phoneNumber,
          metadata: user.metadata
        }))
      };
    } catch (error) {
      console.error("ERROR listUsers", error.code, error.message);
      return { code: ErrorCodes.unknown };
    }
  }
}
