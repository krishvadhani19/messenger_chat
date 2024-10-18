import React from "react";
import "./ChatMessages.scss";
import useMessagesStore from "@/stores/useMessagesStore";
import ChatMessageItem from "./ChatMessageItem/ChatMessageItem";

type ChatMessagesPropsType = {};

const ChatMessages = ({}: ChatMessagesPropsType) => {
  const { messages } = useMessagesStore();

  return (
    <div className="chat-messages-container">
      {messages
        ?.slice()
        .reverse()
        .map((messageItem, index) => {
          return <ChatMessageItem key={index} messageItem={messageItem} />;
        })}
    </div>
  );
};

export default ChatMessages;
