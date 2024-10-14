"use client";

import ChatArea from "../ChatArea/ChatArea";
import ChatHeader from "../ChatHeader/ChatHeader";
import "./ConversationChatSection.scss";
import { MEMBER_WITH_PROFILE } from "@/types/types";
import { memo } from "react";

type ConversationChatSectionPropsType = {
  otherMember: MEMBER_WITH_PROFILE;
};

const ConversationChatSection = ({
  otherMember,
}: ConversationChatSectionPropsType) => {
  return (
    <div className="conversation-chat-section-container">
      <ChatHeader
        chatHeaderName={otherMember?.profile?.name!}
        chatImageUrl={otherMember?.profile?.imageUrl!}
      />

      {/* <ChatArea /> */}
    </div>
  );
};

export default memo(ConversationChatSection);
