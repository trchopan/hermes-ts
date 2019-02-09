import { IUser } from "@/store/root.models";
import {
  IChatContent,
  CHATROOMS_COLLECTION,
  parseChatRoom,
  IChatRoom
} from "./chat.models";
import { GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "@/store/root.store";
import { fireStore } from "@/firebase";

export const chatStoreNamespace = "[chat]";
// const listUsersCallable = fireFunctions.httpsCallable("listUsers");

export const CHAT_ACTIONS = {
  subscribeChatList: "subscribeChatList",
  changeContactList: "changeContactLis"
};

const CHAT_MUTATIONS = {
  chatListCleared: "chatListCleared",
  chatAdded: "chatAdded",
  chatRemoved: "chatRemoved"
};

interface ChatState {
  contactDetails: { [key: string]: IUser };
  currentReceiverId: string;
  chatsList: { [key: string]: IChatRoom };
  currentChat: IChatContent[];
  scrollChatBottomState: boolean;
}

const initState: ChatState = {
  contactDetails: {},
  currentReceiverId: "",
  chatsList: {},
  currentChat: [],
  scrollChatBottomState: false
};

const getters: GetterTree<ChatState, RootState> = {
  currentReceiver: (state) =>
    state.contactDetails ? state.contactDetails[state.currentReceiverId] : null,
  contacts: (state) => Object.values(state.contactDetails)
};

const actions = (): ActionTree<ChatState, RootState> => {
  let activeChatsSnapshot = () => {};

  return {
    [CHAT_ACTIONS.subscribeChatList]: ({ commit, rootState }) => {
      if (!rootState.user) {
        // No user found
        return;
      }
      const userId = rootState.user.uid;

      commit(CHAT_MUTATIONS.chatListCleared);
      activeChatsSnapshot();

      activeChatsSnapshot = fireStore
        .collection(CHATROOMS_COLLECTION)
        .where("participants", "array-contains", userId)
        .orderBy("timestamp", "desc")
        .onSnapshot((chatRoom) => {
          if (!chatRoom.empty) {
            chatRoom.docChanges().forEach((docChange) => {
              switch (docChange.type) {
                case "added":
                case "modified":
                  const id = docChange.doc.id;
                  const data = docChange.doc.data();
                  commit(CHAT_MUTATIONS.chatAdded, parseChatRoom(id, data));
                  break;
                case "removed":
                  commit(CHAT_MUTATIONS.chatRemoved, docChange.doc.id);
                  break;
                default:
                  return;
              }
            });
          }
        });
    }
  };
};

const mutations: MutationTree<ChatState> = {
  [CHAT_MUTATIONS.chatListCleared](state) {
    state.chatsList = {};
  },
  [CHAT_MUTATIONS.chatAdded](state, chat: IChatRoom) {
    state.chatsList = { ...state.chatsList, [chat.id]: chat };
  }
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions: actions(),
  mutations
};
