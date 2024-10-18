import { MESSAGE_WITH_MEMBER_WITH_PROFILE } from "@/types/types";
import { create } from "zustand";

type MessageStoreTypes = {
  messages: null | MESSAGE_WITH_MEMBER_WITH_PROFILE[];

  updateMessages: (updatedMessage: MESSAGE_WITH_MEMBER_WITH_PROFILE) => void;

  setMessages: (messages: MESSAGE_WITH_MEMBER_WITH_PROFILE[]) => void;
};

const useMessagesStore = create<MessageStoreTypes>((set, get) => ({
  messages: null,

  updateMessages: (newMessage) => {
    const { messages } = get();

    const updatedMessages = messages?.map((messageItem) => {
      if (newMessage?.id === messageItem?.id) {
        return { ...newMessage };
      }

      return messageItem;
    });

    console.log({ updatedMessages });

    set({ messages: updatedMessages });
  },

  setMessages: (messages) => set({ messages }),
}));

export const MessagesStore = useMessagesStore.getState;

export default useMessagesStore;
