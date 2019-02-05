import { IUser, USERS_COLLECTION, parseUser } from "@/store/root.models";
import { IChatContent, CHATROOMS_COLLECTION } from "./chat.models";
import { GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "@/store/root.store";
import { fireStore, fireFunctions } from "@/firebase";
import { logger } from "../shared/logger.helper";

export const chatStoreNamespace = "chatStore";
const log = logger(`[${chatStoreNamespace}]`, "#020099");
const listUsersCallable = fireFunctions.httpsCallable("listUsers");

export const CHAT_ACTIONS = {
  subscribeChatsList: `${chatStoreNamespace}/subscribeChatsList`,
  subscribeContactList: `${chatStoreNamespace}/subscribeContactList`,
  changeContactList: `${chatStoreNamespace}/changeContactList`
};

const CHAT_MUTATIONS = {
  contactChangedAtIndex: "contactChangedAtIndex"
};

interface ChatState {
  contactsList: IUser[];
  currentReceiverId: string | null;
  chatsList: any[];
  currentChat: IChatContent[];
  scrollChatBottomState: boolean;
}

const initState: ChatState = {
  contactsList: [],
  currentReceiverId: null,
  chatsList: [],
  currentChat: [],
  scrollChatBottomState: false
};

const getters: GetterTree<ChatState, RootState> = {
  currentReceiver: (state) =>
    state.contactsList.find((x) => x.uid === state.currentReceiverId)
};

const actions = (): ActionTree<ChatState, RootState> => {
  const contactsListSnapshots: Array<() => void> = [];
  let activeChatsSnapshot: () => void;

  return {
    [CHAT_ACTIONS.subscribeContactList]: ({ commit, rootState }) => {
      if (!rootState.user) {
        log("no user found");
        return;
      }
      const userId = rootState.user.uid;
      if (activeChatsSnapshot !== undefined) {
        activeChatsSnapshot();
      }
      if (contactsListSnapshots && Array.isArray(contactsListSnapshots)) {
        contactsListSnapshots.forEach((snap) => snap());
      }

      activeChatsSnapshot = fireStore
        .collection(CHATROOMS_COLLECTION)
        .where(userId, "==", true)
        .onSnapshot((chatRoom) => {
          if (!chatRoom.empty) {
            let keys: string[] = [];
            chatRoom.docs
              .sort((a, b) => {
                if (a.data().timestamp && b.data().timestamp) {
                  return a.data().timestamp - b.data().timestamp;
                } else {
                  return -9999999;
                }
              })
              .forEach((doc) => (keys = keys.concat(Object.keys(doc.data()))));

            const contactIds = keys.filter((x) => x !== userId);
            contactIds.forEach((id, index) => {
              contactsListSnapshots[index] = fireStore
                .collection(USERS_COLLECTION)
                .doc(id)
                .onSnapshot((user) => {
                  if (user.exists) {
                    commit(CHAT_MUTATIONS.contactChangedAtIndex, {
                      index,
                      user: parseUser(user.id, user.data())
                    });
                  }
                });
            });
          }
        });
    }
  };
};

const mutations: MutationTree<ChatState> = {
  [CHAT_MUTATIONS.contactChangedAtIndex](state, { index, user }) {
    state.contactsList[index] = user;
    log(CHAT_MUTATIONS.contactChangedAtIndex, index, user);
  }
};

export default {
  namespace: chatStoreNamespace,
  state: initState,
  getters,
  actions: actions(),
  mutations
};
