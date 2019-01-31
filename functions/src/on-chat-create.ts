import { EventContext } from "firebase-functions";
import { logger } from "./helpers";

const log = logger("onChatRoomCreateHandler");

export async function onChatRoomCreateHandler(
  snap: FirebaseFirestore.DocumentSnapshot,
  context: EventContext
) {
  // No owner field means this is direct message
  if (!snap.get("owner")) {
    const ids = snap.id.split("_");
    try {
      await snap.ref.set({ [ids[0]]: true, [ids[1]]: true });
      log("New direct chat created", ids);
    } catch (error) {
      log("ERROR", error);
    }
  }
}
