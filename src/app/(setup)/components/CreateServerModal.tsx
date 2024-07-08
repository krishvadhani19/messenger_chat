import Modal from "@/components/ui/Modal/Modal";
import React, { memo, useCallback } from "react";
import "./CreateServerModal.scss";
import InputField from "@/components/ui/Input/InputField";
import Button from "@/components/ui/Button/Button";

type CreateServerModalPropsType = {
  isServerModalOpen: boolean;
  closeServerModal: () => void;
};

const CreateServerModal = ({
  isServerModalOpen,
  closeServerModal,
}: CreateServerModalPropsType) => {
  const createServer = useCallback(() => {}, []);

  return (
    <Modal isOpen={isServerModalOpen} onClose={closeServerModal}>
      <div className="create-server-modal-container">
        <div className="create-server-modal-title">Customize your server</div>

        <div className="create-server-modal-sub-title">
          Give your server a personality with a name and an image. Your can
          always change it later.
        </div>

        <InputField
          label="SERVER NAME"
          type="text"
          placeholder="Enter server name"
          errorMessage="Server name is required"
        />

        <Button text="Create" onClick={createServer} isFullWidth={false} />
      </div>
    </Modal>
  );
};

export default memo(CreateServerModal);
