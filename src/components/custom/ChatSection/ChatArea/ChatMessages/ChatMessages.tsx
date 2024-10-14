import { MESSAGE_WITH_MEMBER_WITH_PROFILE } from "@/types/types";
import React from "react";
import "./ChatMessages.scss";
import Avatar from "@/components/ui/Avatar/Avatar";
import { formatISODate } from "@/utils/common";

type ChatMessagesPropsType = {
  messages: { messages: MESSAGE_WITH_MEMBER_WITH_PROFILE[] };
};

const ChatMessages = ({ messages }: ChatMessagesPropsType) => {
  return (
    <div className="chat-messages-container">
      {messages?.messages.map((messageItem) => {
        const { imageUrl, name: imageName } = messageItem?.member?.profile;
        const { createdAt, fileUrl, content } = messageItem;

        const isFilePresent = !!fileUrl;

        if (isFilePresent) {
        }

        return (
          <div key={messageItem?.id} className="chat-message-item-container">
            <div className="chat-message-item-sender-creds">
              <Avatar imageUrl={imageUrl!} imageName={imageName!} />

              {/* Name */}
              <div className="">{imageName}</div>

              {/* Date */}
              <div className="">{formatISODate(createdAt.toString())}</div>
            </div>

            <div className="chat-message-item-message-details">{content}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
