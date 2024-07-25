"use client";

import ChatArea from "../ChatArea/ChatArea";
import ChatHeader from "../ChatHeader/ChatHeader";
import "./ConversationChatSection.scss";
import { CONVERSATION_WITH_BOTH_MEMBER } from "@/types/types";
import { ConversationChatSectionContext } from "@/contexts/ConversationChatSectionContext";

type ConversationChatSectionPropsType = {
  conversation: CONVERSATION_WITH_BOTH_MEMBER;
};

const ConversationChatSection = ({
  conversation,
}: ConversationChatSectionPropsType) => {
  
  return (
    <ConversationChatSectionContext.Provider
      value={{ currentConversation: conversation }}
    >
      <div className="conversation-chat-section-container">
        <ChatHeader chatHeaderName={""} />

        <ChatArea />
      </div>
    </ConversationChatSectionContext.Provider>
  );
};

export default ConversationChatSection;
