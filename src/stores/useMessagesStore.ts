import { MESSAGE_WITH_MEMBER_WITH_PROFILE } from "@/types/types";
import { createRef } from "react";
import { create } from "zustand";

type MessageStoreTypes = {
  cursor: number | null;

  messages: MESSAGE_WITH_MEMBER_WITH_PROFILE[];

  chatContainerRef: React.RefObject<HTMLDivElement>;

  scrollToBottom: () => void;

  setCursor: (cursorVal: number) => void;

  updateMessages: (updatedMessage: MESSAGE_WITH_MEMBER_WITH_PROFILE) => void;

  addNewMessage: (newMessage: MESSAGE_WITH_MEMBER_WITH_PROFILE) => void;

  setMessages: (messages: MESSAGE_WITH_MEMBER_WITH_PROFILE[]) => void;
};

const useMessagesStore = create<MessageStoreTypes>((set, get) => ({
  cursor: null,

  messages: [],

  chatContainerRef: createRef<HTMLDivElement>(),

  scrollToBottom: () => {
    const { chatContainerRef } = get();

    if (chatContainerRef.current) {
      console.log("scrolling");
      chatContainerRef.current.scrollTo({
        top:
          chatContainerRef.current.scrollHeight -
          chatContainerRef.current.clientHeight,
        behavior: "smooth",
      });
    }
  },

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

    set({ messages: updatedMessages });
  },

  addNewMessage: (newMessage) => {
    const { messages, scrollToBottom } = get();

    set({ messages: [newMessage, ...messages] });

    scrollToBottom();
  },

  setMessages: (messages) => {
    set({ messages });
  },
}));

export const MessagesStore = useMessagesStore.getState;

export default useMessagesStore;
