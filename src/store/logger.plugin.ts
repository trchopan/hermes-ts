import { Store, MutationPayload } from "vuex";
import { RootState, rootStoreNamespace } from "./root.store";
import { chatStoreNamespace } from "@/app/chat/chat.store";
import { logger } from "@/app/shared/logger.helper";

const typeColor: { [key: string]: string } = {
  [rootStoreNamespace]: "#333333",
  [chatStoreNamespace]: "#000299"
};

export const loggerPlugin = (store: Store<RootState>) => {
  store.subscribe((mutation: MutationPayload) => {
    const match = mutation.type.match(/^(.*)\/(.*)/);
    const mutationName = match ? match[1] : rootStoreNamespace;
    const actionType = match ? match[2] : mutation.type;
    logger(mutationName, typeColor[mutationName])(actionType, mutation.payload);
  });
};
