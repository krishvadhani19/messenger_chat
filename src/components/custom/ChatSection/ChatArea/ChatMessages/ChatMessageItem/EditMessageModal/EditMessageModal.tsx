import React, { useCallback, useState } from "react";
import "./EditMessageModal.scss";
import Modal from "@/components/ui/Modal/Modal";
import InputField from "@/components/ui/Input/InputField";
import Button from "@/components/ui/Button/Button";
import { APIRequest } from "@/utils/auth-util";

type EditMessageModalPropsType = {
  onClose: () => void;
  messageContent: string;
  messageId: string;
};

const EditMessageModal = ({
  onClose,
  messageContent,
  messageId,
}: EditMessageModalPropsType) => {
  const [message, setMessage] = useState(messageContent);

  const handleMessageChange = useCallback((val: string) => {
    setMessage(val);
  }, []);

  const handleEditMessage = useCallback(async () => {
    await APIRequest({
      method: "PATCH",
      url: `/api/messages/edit-message/${messageId}`,
      data: {
        newMessageContent: message,
      },
    });

    onClose();
  }, [message, messageId, onClose]);

  return (
    <Modal isOpen onClose={onClose}>
      <div className="edit-message-modal-container">
        <div className="edit-message-modal-header">Edit Message</div>

        <div className="edit-message-modal-content">
          <InputField
            inputValue={message}
            onChange={handleMessageChange}
            placeholder="Update message"
          />

          <Button text="Save" isFullWidth={false} onClick={handleEditMessage} />
        </div>
      </div>
    </Modal>
  );
};

export default EditMessageModal;
