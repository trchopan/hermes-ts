import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import { config } from "./firebase.conf";

export const firebaseApp = firebase.initializeApp(config);
export const fireAuth = firebase.auth();
export const fireStore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
fireStore.settings(settings);
export const fireFunctions = firebase.functions();
if (process.env.NODE_ENV !== "production") {
  firebase.functions().useFunctionsEmulator(process.env.VUE_APP_API);
}
export const ReCaptchaVerifier = firebase.auth.RecaptchaVerifier;
