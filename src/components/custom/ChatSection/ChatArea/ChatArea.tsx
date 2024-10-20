"use client";

import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import "./ChatArea.scss";
import ChatWelcome from "./ChatWelcome/ChatWelcome";
import { CHAT_TYPES } from "@/types/types";
import useChatQuery from "@/hooks/useChatQuery";
import {
  DownArrowIcon,
  LoaderCircleIcon,
  ServerCrashIcon,
} from "@/components/ui/Icons";
import ChatMessages from "./ChatMessages/ChatMessages";
import useCurrentServerStore from "@/stores/useCurrentServerStore";

type ChatAreaPropsType = {
  name: string;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  type: CHAT_TYPES;
};

const ChatArea = ({ name, chatId, apiUrl, type }: ChatAreaPropsType) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const { currentChannel } = useCurrentServerStore();
  const [showDownArrow, setShowDownArrow] = useState<boolean>(true);

  const { fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey: `chat:${chatId}`,
      apiUrl,
    });

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top:
          chatContainerRef.current.scrollHeight -
          chatContainerRef.current.clientHeight,
        behavior: "smooth",
      });
    }
  }, []);

  const previousScrollOnfetch = useCallback((prevScrollHeight: number) => {
    if (chatContainerRef?.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight - prevScrollHeight;
    }
  }, []);

  useEffect(() => {
    // Set content as loaded when data is available
    if (status === "success") {
      scrollToBottom();
    }
  }, [scrollToBottom, status]);

  const handleScroll = useCallback(() => {
    if (chatContainerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } =
        chatContainerRef.current;

      /**
       * User at the top of the loaded chat and if more chat is present load more chat
       */
      if (scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();

        const scrollHeightBeforeFetching =
          chatContainerRef.current?.scrollHeight || 0;

        previousScrollOnfetch(scrollHeightBeforeFetching);
      }

      setShowDownArrow(scrollTop + 200 < scrollHeight - clientHeight);
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, previousScrollOnfetch]);

  if (status === "pending") {
    return (
      <div className="chat-area-fallback">
        <LoaderCircleIcon className="spinner" size={40} />
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
    <>
      {showDownArrow && (
        <div
          onClick={() => {
            scrollToBottom();
          }}
          className="scroll-down-button"
        >
          <DownArrowIcon size={18} />
          Scroll to bottom
        </div>
      )}

      <div
        className="chat-area-container"
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        <ChatWelcome
          name={name}
          type={type}
          channelType={currentChannel?.channelType!}
        />

        {isFetchingNextPage && (
          <p className="load-more-messages">
            <LoaderCircleIcon className="spinner" size={20} />
            Loading more messages...
          </p>
        )}

        <ChatMessages />
      </div>
    </>
  );
};

export default memo(ChatArea);
