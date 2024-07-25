"use client";

import ChatArea from "../ChatArea/ChatArea";
import ChatHeader from "../ChatHeader/ChatHeader";
import "./ConversationChatSection.scss";
import {
  CONVERSATION_WITH_BOTH_MEMBER,
  MEMBER_WITH_PROFILE,
} from "@/types/types";
import { ConversationChatSectionContext } from "@/contexts/ConversationChatSectionContext";

type ConversationChatSectionPropsType = {
  conversation: CONVERSATION_WITH_BOTH_MEMBER;
  currentMember: MEMBER_WITH_PROFILE;
  otherMember: MEMBER_WITH_PROFILE;
};

const ConversationChatSection = ({
  currentMember,
  otherMember,
  conversation,
}: ConversationChatSectionPropsType) => {
  return (
    <ConversationChatSectionContext.Provider
      value={{ currentConversation: conversation }}
    >
      <div className="conversation-chat-section-container">
        <ChatHeader
          chatHeaderName={otherMember?.profile?.name!}
          chatImageUrl={otherMember?.profile?.imageUrl!}
        />

        <ChatArea />
      </div>
    </ConversationChatSectionContext.Provider>
  );
};

export default ConversationChatSection;
