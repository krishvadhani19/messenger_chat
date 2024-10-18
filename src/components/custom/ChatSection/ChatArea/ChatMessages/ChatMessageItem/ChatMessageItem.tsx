"use client";

import { iconRoleMap } from "@/components/custom/ServerSidebar/ServerSidebarMain/ServerSidebarMain";
import Avatar from "@/components/ui/Avatar/Avatar";
import { EditIcon, FileIcon, TrashIcon } from "@/components/ui/Icons";
import { CurrentServerStore } from "@/stores/useCurrentServerStore";
import { MESSAGE_WITH_MEMBER_WITH_PROFILE } from "@/types/types";
import { formatISODate } from "@/utils/common";
import { MemberRole } from "@prisma/client";
import classNames from "classnames";
import Image from "next/image";
import React, { memo, useCallback, useState } from "react";
import "./ChatMessageItem.scss";
import EditMessageModal from "./EditMessageModal/EditMessageModal";
import DeleteMessageModal from "./DeleteMessageModal/DeleteMessageModal";

type ChatMessageItemPropsType = {
  messageItem: MESSAGE_WITH_MEMBER_WITH_PROFILE;
};

const ChatMessageItem = ({ messageItem }: ChatMessageItemPropsType) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { currentUserMember } = CurrentServerStore();

  const { imageUrl, name: imageName } = messageItem?.member?.profile;
  const {
    id: messageId,
    createdAt,
    fileUrl,
    content,
    memberId,
    isDeleted,
  } = messageItem;

  const isAdmin = currentUserMember?.role === MemberRole.ADMIN;
  const isModerator = currentUserMember?.role === MemberRole.MODERATOR;
  const isOwner = currentUserMember?.id === memberId;

  const canDeleteMessage = !isDeleted && (isAdmin || isModerator || isOwner);

  const canEditMessage = !isDeleted && isAdmin && !fileUrl;

  const fileType = fileUrl?.split(".").pop();
  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;

  const handleEditMessageState = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const handleDeleteMessage = useCallback(async () => {
    setIsDeleting((prev) => !prev);
  }, []);

  return (
    <div
      key={messageId}
      className={classNames("chat-message-item-container", { isOwner })}
    >
      <div className="chat-message-item-sender-creds">
        <Avatar imageUrl={imageUrl!} imageName={imageName!} size={30} />

        {/* Name */}
        <div className="chat-message-item-sender-creds-name">
          {imageName}
          {iconRoleMap[currentUserMember?.role!]}
        </div>

        {/* Date */}
        <div className="chat-message-item-sender-creds-timestamp">
          {formatISODate(createdAt.toString())}
        </div>
      </div>

      {!fileUrl && !isEditing && !isDeleted && (
        <div className="chat-message-item-message-details">{content}</div>
      )}

      {isDeleted && (
        <div
          className={classNames("chat-message-item-message-details", {
            isDeleted,
          })}
        >
          The message has been deleted
        </div>
      )}

      {isImage && !isDeleted && (
        <div
          rel="noopener noreferrer"
          className="chat-message-item-message-image"
          onClick={() => window.open(fileUrl, "_blank", "noopener,noreferrer")}
        >
          <div className="image-wrapper">
            <Image
              src={fileUrl}
              alt={content}
              fill
              className="message-image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      )}

      {isPDF && !isDeleted && (
        <div
          rel="noopener noreferrer"
          className="chat-message-item-message-file"
          onClick={() => window.open(fileUrl, "_blank", "noopener,noreferrer")}
        >
          <FileIcon size={50} />

          <div>PDF File</div>
        </div>
      )}

      {canDeleteMessage && (
        <div className="chat-message-item-actions">
          {canEditMessage && (
            <EditIcon
              size={18}
              className="chat-message-item-action-item"
              onClick={handleEditMessageState}
            />
          )}

          <TrashIcon
            size={18}
            className="chat-message-item-action-item"
            onClick={handleDeleteMessage}
          />
        </div>
      )}

      {isEditing && (
        <EditMessageModal
          onClose={handleEditMessageState}
          messageId={messageId}
          messageContent={messageItem?.content}
        />
      )}

      {isDeleting && (
        <DeleteMessageModal
          messageContent={messageItem?.content}
          messageId={messageId}
          onClose={handleDeleteMessage}
        />
      )}
    </div>
  );
};

export default memo(ChatMessageItem);
