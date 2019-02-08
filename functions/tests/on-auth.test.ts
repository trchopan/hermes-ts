import * as admin from "firebase-admin";
import * as functionsTest from "firebase-functions-test";
import { PROJECT_CONFIG, SERVICE_KEY_PATH } from "./environment";
import { onAuthCreate, onAuthDelete } from "../src/index";
import { USERS_COLLECTIONS, CHATROOMS_COLLECTIONS } from "../src/collections";
import { handleDeleteChatRooms } from "../src/on-auth";

const test = functionsTest(PROJECT_CONFIG, SERVICE_KEY_PATH);

describe("onAuth", () => {
  const onAuthCreateWrapped = test.wrap(onAuthCreate);
  const onAuthDeleteWrapped = test.wrap(onAuthDelete);
  const stubUser = { uid: "stub-user-123", email: "user@example.com" };
  const userProfileDocRef = admin
    .firestore()
    .collection(USERS_COLLECTIONS)
    .doc(stubUser.uid);
  const chatRoomsColRef = admin.firestore().collection(CHATROOMS_COLLECTIONS);

  beforeAll(async () => {
    const batch = admin.firestore().batch();
    Array(50)
      .fill(1)
      .map((_) => {
        batch.set(chatRoomsColRef.doc(stubUser.uid + "_" + Math.random()), {
          [stubUser.uid]: true
        });
      });
    await batch.commit();
  });

  it("creates initial profile in firestore", async () => {
    await onAuthCreateWrapped(stubUser);
    const snapUserProfile = await userProfileDocRef.get();
    expect(snapUserProfile.exists).toEqual(true);
    expect(snapUserProfile.data()).toEqual({
      email: stubUser.email,
      phoneNumber: null
    });
  });

  it("deletes the profile and chats in firestore", async () => {
    await onAuthDeleteWrapped(stubUser);
    const snapChatRooms = await chatRoomsColRef
      .where(stubUser.uid, "==", true)
      .get();
    expect(snapChatRooms.empty).toEqual(true);
    const snapUserProfile = await userProfileDocRef.get();
    expect(snapUserProfile.exists).toEqual(false);
  });

  it("handles delete chat rooms in chunks correctly", async () => {
    const fakeFirestore = {
      batch: jest.fn(() => ({
        delete: jest.fn(),
        commit: jest.fn().mockResolvedValue(true)
      }))
    };
    const fakeChatRooms = Array(10).fill({ ref: Math.random() });
    await handleDeleteChatRooms(fakeChatRooms as any, 4, fakeFirestore as any);
    /**
     * Split the array of 10 in to chunk of 4 will raise 3 chunks of
     * [[0,1,2,3],[4,5,6,7],[8,9]]
     */
    expect(fakeFirestore.batch).toBeCalledTimes(3);
  });

  afterAll(async () => {
    await userProfileDocRef.delete();
    test.cleanup();
  });
});
