import React, { memo } from "react";
import "./ChatArea.scss";
import ChatWelcome from "./ChatWelcome/ChatWelcome";
import { CHAT_TYPES } from "@/types/types";
import useChatQuery from "@/hooks/useChatQuery";
import { LoaderIcon, ServerCrashIcon } from "@/components/ui/Icons";
import ChatMessages from "./ChatMessages/ChatMessages";
import { CurrentServerStore } from "@/stores/useCurrentServerStore";

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
  const { currentUserMember, currentChannel } = CurrentServerStore();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey: `chat:${chatId}`,
      apiUrl,
    });

  if (status === "pending") {
    return (
      <div className="chat-area-fallback">
        <LoaderIcon className="spinner" size={40} />
        Loading Messages
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="chat-area-fallback">
        <ServerCrashIcon size={40} />
        Something went wrong!
      </div>
    );
  }

  return (
    <div className="chat-area-container">
      <ChatWelcome
        name={name}
        type={type}
        channelType={currentChannel?.channelType!}
      />

      <ChatMessages
        messages={{
          messages: data?.pages?.flatMap((page) => page?.messages) || [],
        }}
        currentUserMember={currentUserMember!}
      />
    </div>
  );
};

export default memo(ChatArea);
