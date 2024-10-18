import { MESSAGE_WITH_MEMBER_WITH_PROFILE } from "@/types/types";
import { create } from "zustand";

type MessageStoreTypes = {
  cursor: number | null;

  messages: MESSAGE_WITH_MEMBER_WITH_PROFILE[];

  setCursor: (cursorVal: number) => void;

  updateMessages: (updatedMessage: MESSAGE_WITH_MEMBER_WITH_PROFILE) => void;

  addNewMessage: (newMessage: MESSAGE_WITH_MEMBER_WITH_PROFILE) => void;

  setMessages: (messages: MESSAGE_WITH_MEMBER_WITH_PROFILE[]) => void;
};

const useMessagesStore = create<MessageStoreTypes>((set, get) => ({
  cursor: null,

  messages: [],

  setCursor: (cursorVal) => {
    set({ cursor: cursorVal });
  },

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

  addNewMessage: (newMessage) => {
    const { messages } = get();

    set({ messages: [newMessage, ...messages] });
  },

  setMessages: (messages) => {
    set({ messages });
  },
}));

export const MessagesStore = useMessagesStore.getState;

export default useMessagesStore;
