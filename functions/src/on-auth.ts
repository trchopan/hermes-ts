import * as admin from "firebase-admin";
import { logger } from "./helpers";
import { UserRecord } from "firebase-functions/lib/providers/auth";
import { EventContext } from "firebase-functions";
import {
  USERS_COLLECTIONS,
  CHATROOMS_COLLECTIONS,
  BATCH_CHUNK_MAX
} from "./collections";

const log = logger("[onAuth]");

export async function onAuthDeleteHandler(
  user: UserRecord,
  context: EventContext
) {
  log("delete", user.uid);

  try {
    const chatRooms = await admin
      .firestore()
      .collection(CHATROOMS_COLLECTIONS)
      .where(user.uid, "==", true)
      .get();

    if (!chatRooms.empty) {
      const result = await handleDeleteChatRooms(
        chatRooms,
        BATCH_CHUNK_MAX,
        admin.firestore()
      );

      log("deleted chat", result);
    }
  } catch (error) {
    log("ERROR onAuthDeleteHandler", error);
    return;
  }

  return await admin
    .firestore()
    .collection(USERS_COLLECTIONS)
    .doc(user.uid)
    .delete();
}

export function onAuthCreateHandler(user: UserRecord, context: EventContext) {
  log("create", user.uid);
  return admin
    .firestore()
    .collection(USERS_COLLECTIONS)
    .doc(user.uid)
    .set({
      email: user.email || null,
      phoneNumber: user.phoneNumber || null
    });
}

/**
 * Defensively program to split the batch in to chunks
 */
export async function handleDeleteChatRooms(
  chatRooms: FirebaseFirestore.QuerySnapshot,
  chunkSize: number,
  firestore: FirebaseFirestore.Firestore
) {
  const chatRoomDeleteBatchs: FirebaseFirestore.WriteBatch[] = [];
  let chatRoomIndex = 0;
  chatRooms.forEach((chatRoom) => {
    if (chatRoomIndex % chunkSize === 0) {
      chatRoomDeleteBatchs.push(firestore.batch());
    }
    const lastBatchIndex = chatRoomDeleteBatchs.length - 1;
    chatRoomDeleteBatchs[lastBatchIndex].delete(chatRoom.ref);
    chatRoomIndex++;
  });

  const result = Promise.all(
    chatRoomDeleteBatchs.map((batch, index) =>
      batch.commit().then((_) => ({ index, completed: true }))
    )
  );

  return result;
}
