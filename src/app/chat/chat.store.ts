import { IUser, USERS_COLLECTION, parseUser } from "@/store/root.models";
import { IChatContent, CHATROOMS_COLLECTION } from "./chat.models";
import { GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "@/store/root.store";
import { fireStore } from "@/firebase";

export const chatStoreNamespace = "[chat]";
// const listUsersCallable = fireFunctions.httpsCallable("listUsers");

export const CHAT_ACTIONS = {
  subscribeChatsList: "subscribeChatsList",
  subscribeContactList: "subscribeContactList",
  changeContactList: "changeContactLis"
};

const CHAT_MUTATIONS = {
  contactAdded: "contactAdded",
  contactListCleared: "contactListCleared"
};

interface ChatState {
  contactIds: string[];
  contactDetails: { [key: string]: IUser };
  currentReceiverId: string;
  chatsList: any[];
  currentChat: IChatContent[];
  scrollChatBottomState: boolean;
}

const initState: ChatState = {
  contactIds: [],
  contactDetails: {},
  currentReceiverId: "",
  chatsList: [],
  currentChat: [],
  scrollChatBottomState: false
};

const getters: GetterTree<ChatState, RootState> = {
  currentReceiver: (state) =>
    state.contactDetails ? state.contactDetails[state.currentReceiverId] : null,
  contacts: (state) => Object.values(state.contactDetails)
};

const actions = (): ActionTree<ChatState, RootState> => {
  const contactsListSnapshots: { [key: string]: () => void } = {};
  let activeChatsSnapshot = () => {};

  return {
    [CHAT_ACTIONS.subscribeContactList]: ({ commit, rootState }) => {
      if (!rootState.user) {
        // No user found
        return;
      }
      const userId = rootState.user.uid;

      Object.keys(contactsListSnapshots).forEach((key) =>
        contactsListSnapshots[key]()
      );
      
      activeChatsSnapshot();
      activeChatsSnapshot = fireStore
        .collection(CHATROOMS_COLLECTION)
        .where(userId, "==", true)
        .onSnapshot((chatRoom) => {
          if (!chatRoom.empty) {
            chatRoom.docs
              .sort((a, b) => {
                if (a.data().timestamp && b.data().timestamp) {
                  return a.data().timestamp - b.data().timestamp;
                } else {
                  return -9999999;
                }
              })
              .map((doc) => Object.keys(doc.data()))
              .flat()
              .filter((x) => x !== userId)
              .forEach((id) => {
                contactsListSnapshots[id] = fireStore
                  .collection(USERS_COLLECTION)
                  .doc(id)
                  .onSnapshot((user) => {
                    if (user.exists) {
                      commit(
                        CHAT_MUTATIONS.contactAdded,
                        parseUser(user.id, user.data())
                      );
                    }
                  });
              });
          }
        });
    }
  };
};

const mutations: MutationTree<ChatState> = {
  [CHAT_MUTATIONS.contactAdded](state, user: IUser) {
    if (!state.contactDetails[user.uid]) {
      state.contactIds.push(user.uid);
    }
    state.contactDetails = { ...state.contactDetails, [user.uid]: user };
  }
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions: actions(),
  mutations
};
