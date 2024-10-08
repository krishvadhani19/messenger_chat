import React, { memo } from "react";
import "./ChatArea.scss";
import { Member } from "@prisma/client";
import ChatWelcome from "./ChatWelcome/ChatWelcome";
import { CHAT_TYPES } from "@/types/types";

type ChatAreaPropsType = {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  // paramKey: "channelId" | "conversationId";
  // paramValue: string;
  type: CHAT_TYPES;
};

const ChatArea = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  // paramKey,
  // paramValue,
  type,
}: ChatAreaPropsType) => {
  return (
    <div className="chat-area-container">
      ChatArea
      <ChatWelcome name={name} type={type} />
    </div>
  );
};

export default memo(ChatArea);
