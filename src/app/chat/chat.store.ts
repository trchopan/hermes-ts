import { IUser } from "@/store/root.models";
import { IChatContent, CHATROOMS_COLLECTION } from "./chat.models";
import { GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "@/store/root.store";
import { fireStore, fireFunctions } from "@/firebase";
import { logger } from "../shared/logger.helper";

const namespace = "chatStore";
const log = logger(`[${namespace}]`, "#020099");
const listUsersCallable = fireFunctions.httpsCallable("listUsers");

export const CHAT_ACTIONS = {
  fetchContactList: `${namespace}/fetchContactList`,
  changeContactList: `${namespace}/changeContactList`
};

const CHAT_MUTATIONS = {
  contactListChanged: "contactListChanged"
};

interface ChatState {
  contactList: IUser[];
  currentReceiver: IUser | null;
  currentChat: IChatContent[];
  scrollChatBottomState: boolean;
}

const initState: ChatState = {
  contactList: [],
  currentReceiver: null,
  currentChat: [],
  scrollChatBottomState: false
};

const getters: GetterTree<ChatState, RootState> = {};

const actions: ActionTree<ChatState, RootState> = {
  [CHAT_ACTIONS.fetchContactList]: async ({ commit, rootState }) => {
    if (!rootState.user) {
      log("no user found");
      return;
    }
    const userId = rootState.user.uid;
    const activeChats = await fireStore
      .collection(CHATROOMS_COLLECTION)
      .where(userId, "==", true)
      .get()
      .then((chatRoom) => {
        if (!chatRoom.empty) {
          let keys: string[] = [];
          chatRoom.docs.forEach(
            (doc) => (keys = keys.concat(Object.keys(doc.data())))
          );
          return keys.filter((x) => x !== userId);
        }
        return null;
      });

    const result = await listUsersCallable({
      users: activeChats
    });

    if (result.data.users) {
      const contactList = (result.data.users as IUser[]).filter(
        (x) => x.uid !== userId
      );
      commit(CHAT_MUTATIONS.contactListChanged, contactList);
    } else {
      log("no users list found");
    }
  },
  [CHAT_ACTIONS.changeContactList]: ({ commit }, contactList: IUser[]) =>
    commit(CHAT_MUTATIONS.contactListChanged, contactList)
};

const mutations: MutationTree<ChatState> = {
  [CHAT_MUTATIONS.contactListChanged](state, contactList: IUser[]) {
    state.contactList = contactList;
    log(CHAT_MUTATIONS.contactListChanged, contactList);
  }
};

export default {
  namespace,
  state: initState,
  getters,
  actions,
  mutations
};
