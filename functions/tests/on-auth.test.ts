import * as admin from "firebase-admin";
import * as functionsTest from "firebase-functions-test";
import { PROJECT_CONFIG, SERVICE_KEY_PATH } from "./environment";
import { onAuthCreate, onAuthDelete } from "../src/index";
import { USERS_COLLECTIONS } from "../src/collections";

const test = functionsTest(PROJECT_CONFIG, SERVICE_KEY_PATH);

describe("onAuth", () => {
  const onAuthCreateWrapped = test.wrap(onAuthCreate);
  const onAuthDeleteWrapped = test.wrap(onAuthDelete);
  const stubUser = { uid: "stub-user-123" };
  const userProfileDocRef = admin
    .firestore()
    .collection(USERS_COLLECTIONS)
    .doc(stubUser.uid);

  it("creates initial profile in firestore", async () => {
    await onAuthCreateWrapped(stubUser);
    const snapUserProfile = await userProfileDocRef.get();
    expect(snapUserProfile.exists).toEqual(true);
    expect(snapUserProfile.data()).toEqual({
      displayName: "",
      phoneNumber: ""
    });
  });

  it("deletes the profile and chats in firestore", async () => {
    await onAuthDeleteWrapped(stubUser);
    const snapUserProfile = await userProfileDocRef.get();
    expect(snapUserProfile.exists).toEqual(false);
  });

  afterAll(async () => {
    await userProfileDocRef.delete();
    test.cleanup();
  });
});
