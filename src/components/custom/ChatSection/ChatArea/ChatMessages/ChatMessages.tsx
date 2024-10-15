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
import classNames from "classnames";
import { iconRoleMap } from "@/components/custom/ServerSidebar/ServerSidebarMain/ServerSidebarMain";
import Image from "next/image";

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

        const canEditMessage = !isDeleted && isAdmin && !fileUrl;

        const fileType = fileUrl?.split(".").pop();
        const isPDF = fileType === "pdf" && fileUrl;
        const isImage = !isPDF && fileUrl;

        return (
          <div
            key={messageItem?.id}
            className={classNames("chat-message-item-container", { isOwner })}
          >
            <div className="chat-message-item-sender-creds">
              <Avatar imageUrl={imageUrl!} imageName={imageName!} />

              {/* Name */}
              <div className="chat-message-item-sender-creds-name">
                {imageName}
                {iconRoleMap[currentUserMember?.role]}
              </div>

              {/* Date */}
              <div className="chat-message-item-sender-creds-timestamp">
                {formatISODate(createdAt.toString())}
              </div>
            </div>

            {!fileUrl && !isEditing && (
              <div className="chat-message-item-message-details">{content}</div>
            )}

            {isImage && (
              <a
                target="_blank"
                href={fileUrl}
                rel="noopener noreferrer"
                className="chat-message-item-message-image"
              >
                <Image
                  src={fileUrl}
                  alt={content}
                  // fill
                  className=""
                  width={48}
                  height={48}
                />
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
