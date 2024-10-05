"use client";

import React, { FormEvent, memo, useCallback, useState } from "react";
import "./ChatAttachmentModal.scss";
import Modal from "@/components/ui/Modal/Modal";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { APIRequest } from "@/utils/auth-util";
import { z } from "zod";
import { useUploadThing } from "@/hooks/useUploadThing";
import FileUploader from "@/components/ui/FileUploader/FileUploader";
import Button from "@/components/ui/Button/Button";
import { ChatAttachmentModalSchema } from "@/server/schemas/ChatAttachmentModalSchema";
import useCurrentUserStore from "@/stores/useCurrentUser";
import { CrossIcon, FileIcon } from "@/components/ui/Icons";

type ManageFileModalPropsType = {
  isOpen: boolean;
  onClose: () => void;
};

type ChatAttachmentModalSchemaType = z.infer<typeof ChatAttachmentModalSchema>;

const initialFormData: ChatAttachmentModalSchemaType = {
  attachment: {
    url: "",
    file: undefined,
  },
};

const MessageFileModal = ({ onClose }: ManageFileModalPropsType) => {
  const router = useRouter();
  const { serverId, channelId } = useParams();
  const { currentUserMember } = useCurrentUserStore();

  const [formData, setFormData] =
    useState<ChatAttachmentModalSchemaType>(initialFormData);

  const { startUpload } = useUploadThing("chatAttachment", {
    onClientUploadComplete: async ([data]) => {
      await APIRequest({
        method: "POST",
        url: "/api/socket",
        data: {
          channelId,
          memberId: currentUserMember?.id,
          serverId,
          content: `File attachment`,
          fileUrl: data?.url,
        },
      });
    },
  });

  const removeImage = useCallback(() => {
    URL.revokeObjectURL(formData?.attachment?.url);
    setFormData((prev) => ({
      ...prev,
      attachment: {
        url: "",
        file: undefined,
      },
    }));
  }, [formData?.attachment?.url]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleFileUploader = useCallback((inputFile: File) => {
    const imageUrl = URL.createObjectURL(inputFile);

    setFormData((prev) => ({
      ...prev,
      attachment: { url: imageUrl, file: inputFile },
    }));
  }, []);

  const sendAttachment = useCallback(
    async (e: FormEvent) => {
      try {
        e.preventDefault();

        await startUpload([formData?.attachment?.file as File]);

        router.refresh();

        // Making API call post cloud upload in its callback
        handleClose();
      } catch (error) {
        toast.error("Something went wrong while uploading. Please try again!");
      }
    },
    [startUpload, formData?.attachment?.file, router, handleClose]
  );

  return (
    <Modal isOpen onClose={handleClose}>
      <form
        className="chat-attachment-modal-container"
        onSubmit={sendAttachment}
      >
        <div className="chat-attachment-modal-title">Add an attachment</div>

        <div className="chat-attachment-modal-sub-title">
          Send file as message
        </div>

        {formData?.attachment?.url ? (
          <div className="chat-attachment-modal-image-container">
            <FileIcon size={80} />

            <CrossIcon
              className="image-cross-icon"
              size={16}
              onClick={removeImage}
            />
          </div>
        ) : (
          <FileUploader maxFiles={1} fileUploadCallback={handleFileUploader} />
        )}

        <Button
          text="Send"
          buttonType="submit"
          isFullWidth={false}
          disabled={!formData?.attachment?.url}
        />
      </form>
    </Modal>
  );
};

export default memo(MessageFileModal);
