import React, { memo } from "react";
import "./ChatArea.scss";
import { Member } from "@prisma/client";
import ChatWelcome from "./ChatWelcome/ChatWelcome";
import { CHAT_TYPES, CHAT_TYPES_MAP } from "@/types/types";
import useChatQuery from "@/hooks/useChatQuery";
import { LoaderIcon, ServerCrashIcon } from "@/components/ui/Icons";

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
  const queryKey = `chat:${chatId}`;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey: CHAT_TYPES_MAP.conversation,
      paramValue: "",
    });

  if (status === "pending") {
    return (
      <div className="flex-center">
        <LoaderIcon className="spinner" size={22} />
        Loading Messages
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex-center">
        <ServerCrashIcon size={22} />
        Something went wrong!
      </div>
    );
  }

  return (
    <div className="chat-area-container">
      ChatArea
      <ChatWelcome name={name} type={type} />
    </div>
  );
};

export default memo(ChatArea);
