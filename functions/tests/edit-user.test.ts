import * as admin from "firebase-admin";
import * as functionsTest from "firebase-functions-test";
import { PROJECT_CONFIG, SERVICE_KEY_PATH } from "./environment";
import { USERS_COLLECTIONS } from "../src/collections";
import { editUser } from "../src";

const test = functionsTest(PROJECT_CONFIG, SERVICE_KEY_PATH);

describe("editUser", () => {
  const editUserWrapped = test.wrap(editUser);
  const stubUser = { uid: "stub-user-123" };
  const stubUserProfile = {
    displayName: "Test User",
    photoURL: "test.jpg",
    email: "user@example.com",
    phoneNumber: "+0123456789"
  };

  const userProfileDocRef = admin
    .firestore()
    .collection(USERS_COLLECTIONS)
    .doc(stubUser.uid);

  it("edits the user correctly", async () => {
    await userProfileDocRef.set(stubUserProfile);
    await editUserWrapped(
      { displayName: "test", photoURL: "picture.jpg" },
      { auth: stubUser }
    );
    const snapUserProfile = await userProfileDocRef.get();
    const { displayName, photoURL } = snapUserProfile.data() as any;
    expect(displayName).toEqual("test");
    expect(photoURL).toEqual("picture.jpg");
  });

  afterAll(async () => {
    await userProfileDocRef.delete();
    test.cleanup();
  });
});
