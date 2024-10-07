"use client";

import { memo, useCallback, useRef, useState } from "react";
import "./ChatInput.scss";
import { z } from "zod";
import { ChatInputSchema } from "@/server/schemas/ChatInputSchema";
import { PlusIcon, SendIcon, SmileIcon } from "@/components/ui/Icons";
import InputField from "@/components/ui/Input/InputField";
import classNames from "classnames";
import { useSocket } from "@/hooks/useSocket";
import { useParams } from "next/navigation";
import ChatAttachmentModal from "./ChatAttachmentModal/ChatAttachmentModal";
import Popover from "@/components/ui/Popover/Popover";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { CurrentServerStore } from "@/stores/useCurrentServerStore";

type ChatInputPropsType = {
  query: Record<string, any>;
  placeholder: string;
};

type ChatInputFormType = z.infer<typeof ChatInputSchema>;

const ChatInput = ({ query, placeholder }: ChatInputPropsType) => {
  const [formData, setFormData] = useState<ChatInputFormType>({
    content: "",
  });
  const { serverId, channelId } = useParams();
  const { messages, sendMessage } = useSocket();
  const currentUserMember = CurrentServerStore()?.currentUserMember;
  const [isChatAttachmentModalOpen, setIsChatAttachmentModalOpen] =
    useState<boolean>(false);
  const emojiRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = useCallback(async () => {
    try {
      sendMessage(
        formData?.content,
        currentUserMember?.id!,
        channelId as string,
        serverId as string,
        undefined
      );
      setFormData({ content: "" });
    } catch (error) {
      console.error(error);
    }
  }, [
    channelId,
    currentUserMember?.id,
    formData?.content,
    sendMessage,
    serverId,
  ]);

  const handleMessageChange = useCallback((val: string) => {
    setFormData({ content: val });
  }, []);

  const handleAddFileModalState = () => {
    setIsChatAttachmentModalOpen(true);
  };

  const getEmojiPopoverContent = useCallback((handleClose: any) => {
    const onEmojiSelect = (emoji: any) => {
      setFormData((prev) => ({
        ...prev,
        content: `${prev.content}${emoji?.native}`,
      }));
      handleClose();
    };

    return <Picker data={data} onEmojiSelect={onEmojiSelect} />;
  }, []);

  return (
    <div className="chat-input-area">
      <div className="chat-input-container">
        <div
          className="chat-input-add-attachment-btn"
          onClick={handleAddFileModalState}
        >
          <PlusIcon size={18} />
        </div>

        <div className="chat-input-add-attachment-btn" ref={emojiRef}>
          <SmileIcon size={18} />
        </div>

        <div className="chat-input-field-container">
          <InputField
            inputValue={formData?.content}
            onChange={handleMessageChange}
            autoComplete="off"
            placeholder={placeholder}
            onEnterKeyPress={handleSendMessage}
          />
        </div>

        <div
          className={classNames("chat-input-send-btn", {
            disabled: !formData?.content,
          })}
          onClick={handleSendMessage}
        >
          <SendIcon size={18} />
        </div>
      </div>

      {isChatAttachmentModalOpen && (
        <ChatAttachmentModal
          isOpen
          onClose={() => {
            setIsChatAttachmentModalOpen(false);
          }}
        />
      )}

      <Popover anchorRef={emojiRef}>{getEmojiPopoverContent}</Popover>
    </div>
  );
};

export default memo(ChatInput);
