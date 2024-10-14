import React, { memo } from "react";
import "./ChatArea.scss";
import ChatWelcome from "./ChatWelcome/ChatWelcome";
import { CHAT_TYPES } from "@/types/types";
import useChatQuery from "@/hooks/useChatQuery";
import { LoaderIcon, ServerCrashIcon } from "@/components/ui/Icons";
import ChatMessages from "./ChatMessages/ChatMessages";

type ChatAreaPropsType = {
  name: string;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  type: CHAT_TYPES;
};

const ChatArea = ({
  name,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  type,
}: ChatAreaPropsType) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey: `chat:${chatId}`,
      apiUrl,
    });

  if (status === "pending") {
    return (
      <div className="flex-center direction-column">
        <LoaderIcon className="spinner" size={22} />
        Loading Messages
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex-center direction-column">
        <ServerCrashIcon size={22} />
        Something went wrong!
      </div>
    );
  }

  return (
    <div className="chat-area-container">
      <ChatWelcome name={name} type={type} />

      <ChatMessages
        messages={{
          messages: data?.pages?.flatMap((page) => page?.messages) || [],
        }}
      />
    </div>
  );
};

export default memo(ChatArea);
