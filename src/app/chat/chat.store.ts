import { parseProfile, IProfile } from "@/store/root.models";
import {
  IChatContent,
  CHATROOMS_COLLECTION,
  parseChatRoom,
  IChatRoom,
  CHATS_COLLECTION,
  parseChatContent
} from "./chat.models";
import { GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState, ROOT_ACTIONS } from "@/store/root.store";
import { firebaseApp } from "@/firebase";

export const chatStoreNamespace = "[chat]";
// const listUsersCallable = fireFunctions.httpsCallable("listUsers");

export const CHAT_ACTIONS = {
  subscribeChatList: "subscribeChatList",
  subscribeChatContent: "subscribeChatContent",
  selectChatRoom: "selectChatRoom",
  addContact: "addContact"
};

const CHAT_MUTATIONS = {
  chatRoomSelected: "chatRoomSelected",
  chatRoomsCleared: "chatRoomsCleared",
  chatRoomAdded: "chatRoomAdded",
  chatRoomModified: "chatRoomModified",
  chatRoomRemoved: "chatRoomRemoved",
  chatsCleared: "chatsCleared",
  chatAdded: "chatAdded",
  chatModified: "chatModified",
  chatRemoved: "chatRemoved"
};

interface ChatState {
  currentReceiverId: string;
  selectedChatRoom: IChatRoom | null;
  chatRooms: IChatRoom[];
  chatContent: IChatContent[];
  scrollChatBottomState: boolean;
}

const initState: ChatState = {
  currentReceiverId: "",
  selectedChatRoom: null,
  chatRooms: [],
  chatContent: [],
  scrollChatBottomState: false
};

const chatGetters: GetterTree<ChatState, RootState> = {
  contacts: (state) =>
    state.chatRooms.map((chatRoom) => chatRoom.participants).flat()
};

const chatActions = (
  firestore: firebase.firestore.Firestore,
  findUser: firebase.functions.HttpsCallable
): ActionTree<ChatState, RootState> => {
  let chatRoomsSnapshot: any;
  let chatContentSnapshot: any;

  return {
    [CHAT_ACTIONS.subscribeChatList]: ({ commit, rootState }) => {
      commit(CHAT_MUTATIONS.chatRoomsCleared);
      if (chatRoomsSnapshot !== undefined) {
        chatRoomsSnapshot();
      }

      const userId = rootState.user!.uid; // null state is checked in Chat
      chatRoomsSnapshot = firebaseApp
        .firestore()
        .collection(CHATROOMS_COLLECTION)
        .where("participants", "array-contains", userId)
        .orderBy("timestamp", "desc")
        .onSnapshot((chatRoom) => {
          if (!chatRoom.empty) {
            chatRoom.docChanges().forEach(async (docChange) => {
              const parsedChatRoom =
                docChange.type !== "removed"
                  ? await parseChatRoom(
                      userId,
                      docChange.doc,
                      firebaseApp,
                      parseProfile
                    )
                  : null;
              switch (docChange.type) {
                case "added":
                  commit(CHAT_MUTATIONS.chatRoomAdded, {
                    index: docChange.newIndex,
                    data: parsedChatRoom
                  });
                  break;
                case "modified":
                  commit(CHAT_MUTATIONS.chatRoomModified, {
                    index: docChange.newIndex,
                    data: chatRoom
                  });
                  break;
                case "removed":
                  commit(CHAT_MUTATIONS.chatRoomRemoved, {
                    index: docChange.oldIndex
                  });
                  break;
                default:
                  break;
              }
            });
          }
        });
    },
    [CHAT_ACTIONS.addContact]: async (
      { getters, dispatch, rootState, rootGetters },
      contactData: any
    ): Promise<boolean> => {
      try {
        dispatch(
          ROOT_ACTIONS.changeLoadingMessage,
          rootGetters.$t.creatingChatRoom,
          { root: true }
        );
        const result = await findUser(contactData);
        const foundContact = (getters.contacts as IProfile[]).find(
          (x) => x.uid === result.data.user
        );
        if (foundContact) {
          const error = { message: rootGetters.$t.contactAlreadyAdded };
          dispatch(ROOT_ACTIONS.changeError, error, { root: true });
          return false;
        } else {
          const userId = rootState.user!.uid; // null state is checked in Chat
          await firestore.collection(CHATROOMS_COLLECTION).add({
            participants: [userId, result.data.user],
            timestamp: Date.now()
          });
          dispatch(ROOT_ACTIONS.finishLoading, null, { root: true });
          return true;
        }
      } catch (error) {
        error = { message: rootGetters.$t.notFoundUser };
        dispatch(ROOT_ACTIONS.changeError, error, { root: true });
        return false;
      }
    },
    [CHAT_ACTIONS.selectChatRoom]: (
      { state, commit, dispatch, rootGetters, rootState },
      receiverId: string
    ) => {
      const foundChatRoom = state.chatRooms.find((chatRoom) =>
        chatRoom.participants.some((x) => x.uid === receiverId)
      );

      if (!foundChatRoom) {
        const error = { message: rootGetters.$t.errorReadingChatContent };
        dispatch(ROOT_ACTIONS.changeError, error, { root: true });
        return;
      } else {
        commit(CHAT_MUTATIONS.chatRoomSelected, foundChatRoom);
        commit(CHAT_MUTATIONS.chatsCleared);

        const chatsColRef = firestore
          .collection(CHATROOMS_COLLECTION)
          .doc(foundChatRoom.id)
          .collection(CHATS_COLLECTION)
          .orderBy("timestamp", "desc");

        if (chatContentSnapshot !== undefined) {
          chatContentSnapshot();
        }

        chatContentSnapshot = chatsColRef.limit(15).onSnapshot((snap) => {
          snap.docChanges().forEach(async (change) => {
            const data = parseChatContent(change.doc.id, change.doc.data());
            switch (change.type) {
              case "added":
                commit(CHAT_MUTATIONS.chatAdded, {
                  index: change.newIndex,
                  data
                });
                if (!data.delivered && data.senderId !== rootState.user!.uid) {
                  await change.doc.ref.update({ delivered: true });
                }
                break;
              case "modified":
                commit(CHAT_MUTATIONS.chatModified, data);
                break;
              default:
                break;
            }
          });
        });
      }
    }
  };
};

const chatMutations: MutationTree<ChatState> = {
  [CHAT_MUTATIONS.chatRoomsCleared](state) {
    state.chatRooms = [];
  },
  [CHAT_MUTATIONS.chatRoomAdded](
    state,
    payload: { index: number; data: IChatRoom }
  ) {
    state.chatRooms.splice(payload.index, 0, payload.data);
  },
  [CHAT_MUTATIONS.chatRoomModified](
    state,
    payload: { index: number; data: IChatRoom }
  ) {
    state.chatRooms.splice(payload.index, 1, payload.data);
  },
  [CHAT_MUTATIONS.chatRoomRemoved](state, payload: { index: number }) {
    state.chatRooms.splice(payload.index, 1);
  },
  [CHAT_MUTATIONS.chatsCleared](state) {
    state.chatContent = [];
  },
  [CHAT_MUTATIONS.chatAdded](
    state,
    payload: { index: number; data: IChatContent }
  ) {
    if (payload.index === 0) {
      state.chatContent.push(payload.data);
    } else {
      state.chatContent.splice(
        state.chatContent.length - payload.index,
        0,
        payload.data
      );
    }
  },
  [CHAT_MUTATIONS.chatModified](state, data: IChatContent) {
    const foundIndex = state.chatContent.findIndex((x) => x.id === data.id);
    if (foundIndex >= 0) {
      state.chatContent.splice(foundIndex, 1, data);
    }
  },
  [CHAT_MUTATIONS.chatRemoved](state, payload: { index: number }) {
    state.chatContent.splice(payload.index, 1);
  },
  [CHAT_MUTATIONS.chatRoomSelected](state, chatRoom: IChatRoom | null) {
    state.selectedChatRoom = chatRoom;
  }
};

export default {
  namespaced: true,
  state: initState,
  getters: chatGetters,
  actions: chatActions(
    firebaseApp.firestore(),
    firebaseApp.functions().httpsCallable("findUser")
  ),
  mutations: chatMutations
};
