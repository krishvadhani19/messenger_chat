"use client";

import {
  MEMBER_WITH_PROFILE,
  MESSAGE_WITH_MEMBER_WITH_PROFILE,
} from "@/types/types";
import React, { useState } from "react";
import "./ChatMessages.scss";
import Avatar from "@/components/ui/Avatar/Avatar";
import { formatISODate } from "@/utils/common";
import { MemberRole } from "@prisma/client";

type ChatMessagesPropsType = {
  messages: { messages: MESSAGE_WITH_MEMBER_WITH_PROFILE[] };
  currentUserMember: MEMBER_WITH_PROFILE;
};

const ChatMessages = ({
  messages,
  currentUserMember,
}: ChatMessagesPropsType) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  return (
    <div className="chat-messages-container">
      {messages?.messages.map((messageItem) => {
        const { imageUrl, name: imageName } = messageItem?.member?.profile;
        const { createdAt, fileUrl, content, memberId, isDeleted } =
          messageItem;

        const isAdmin = currentUserMember?.role === MemberRole.ADMIN;
        const isModerator = currentUserMember?.role === MemberRole.MODERATOR;
        const isOwner = currentUserMember?.id === memberId;

        const canDeleteMessage =
          !isDeleted && (isAdmin || isModerator || isOwner);

        const canEditMessage =
          !isDeleted && (isAdmin || isModerator || isOwner);

        const fileType = fileUrl?.split(".").pop();
        const isPDF = fileType === "pdf" && fileUrl;
        const isImage = !isPDF && fileUrl;

        return (
          <div key={messageItem?.id} className="chat-message-item-container">
            <div className="chat-message-item-sender-creds">
              <Avatar imageUrl={imageUrl!} imageName={imageName!} />

              {/* Name */}
              <div className="chat-message-item-sender-creds-name">
                {imageName}
              </div>

              {/* Date */}
              <div className="chat-message-item-sender-creds-timestamp">
                {formatISODate(createdAt.toString())}
              </div>
            </div>

            {!fileUrl && !isEditing && (
              <div className="chat-message-item-message-details">{content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
