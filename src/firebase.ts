import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import { config } from "./firebase.conf";

export const firebaseApp = firebase.initializeApp(config);

const settings = { timestampsInSnapshots: true };
firebaseApp.firestore().settings(settings);
if (process.env.NODE_ENV !== "production") {
  firebase.functions().useFunctionsEmulator(process.env.VUE_APP_API);
}
