"use client";

import "./ChatSection.scss";
import ChatHeader from "./ChatHeader/ChatHeader";
import { ChatSectionContext } from "@/contexts/ChatSectionContext";
import ChatArea from "./ChatArea/ChatArea";
import { Chanel } from "@prisma/client";

type ChatSectionPropsType = {
  currentChannel: Chanel;
};

const ChatSection = ({ currentChannel }: ChatSectionPropsType) => {
  return (
    <ChatSectionContext.Provider value={{ currentChannel }}>
      <div className="chat-section-container">
        <ChatHeader />

        <ChatArea />
      </div>
    </ChatSectionContext.Provider>
  );
};

export default ChatSection;
