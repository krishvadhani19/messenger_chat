import React, { memo } from "react";
import "./ChatArea.scss";
import { Member } from "@prisma/client";

type ChatAreaPropsType = {
  name: String;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
};

const ChatArea = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatAreaPropsType) => {
  return <div className="chat-area-container">ChatArea</div>;
};

export default memo(ChatArea);
