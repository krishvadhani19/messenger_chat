import { MESSAGE_WITH_MEMBER_WITH_PROFILE } from "@/types/types";
import { create } from "zustand";

type MessageStoreTypes = {
  messages: null | MESSAGE_WITH_MEMBER_WITH_PROFILE[];

  setMessages: (messages: MESSAGE_WITH_MEMBER_WITH_PROFILE[]) => void;
};

const useMessagesStore = create<MessageStoreTypes>((set, get) => ({
  messages: null,

  setMessages: (messages) => set({ messages }),
}));

export const MessagesStore = useMessagesStore.getState;

export default useMessagesStore;
