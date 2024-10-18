"use client";

import React, { memo, useEffect, useRef } from "react";
import "./ChatArea.scss";
import ChatWelcome from "./ChatWelcome/ChatWelcome";
import { CHAT_TYPES } from "@/types/types";
import useChatQuery from "@/hooks/useChatQuery";
import { LoaderCircleIcon, ServerCrashIcon } from "@/components/ui/Icons";
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

const ChatArea = ({
  name,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  type,
}: ChatAreaPropsType) => {
  const topRef = useRef<HTMLDivElement>(null);

  const { currentChannel } = useCurrentServerStore();

  const { fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey: `chat:${chatId}`,
      apiUrl,
    });

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries?.[0].isIntersecting) {
        fetchNextPage();
      }
    });

    if (topRef.current) {
      observer.observe(topRef.current);
    }

    return () => {
      if (topRef.current) {
        observer.unobserve(topRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
    <div className="chat-area-container">
      <ChatWelcome
        name={name}
        type={type}
        channelType={currentChannel?.channelType!}
      />
      <div ref={topRef} className="load-more-trigger" />

      <ChatMessages />
    </div>
  );
};

export default memo(ChatArea);
