import { MEMBER_WITH_PROFILE } from "@/types/types";
import React from "react";
import "./ChatMessages.scss";
import useMessagesStore from "@/stores/useMessagesStore";
import ChatMessageItem from "./ChatMessageItem/ChatMessageItem";

type ChatMessagesPropsType = {
  currentUserMember: MEMBER_WITH_PROFILE;
};

const ChatMessages = ({ currentUserMember }: ChatMessagesPropsType) => {
  const { messages } = useMessagesStore();

  return (
    <div className="chat-messages-container">
      {messages?.map((messageItem, index) => {
        return <ChatMessageItem key={index} messageItem={messageItem} />;
      })}
    </div>
  );
};

export default ChatMessages;
