import Modal from "@/components/ui/Modal/Modal";
import React from "react";
import "./CreateServerModal.scss";
import InputField from "@/components/ui/Input/InputField";

type CreateServerModalPropsType = {
  isServerModalOpen: boolean;
  closeServerModal: () => void;
};

const CreateServerModal = ({
  isServerModalOpen,
  closeServerModal,
}: CreateServerModalPropsType) => {
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
          errorMessage="Server name is required"
        />
      </div>
    </Modal>
  );
};

export default CreateServerModal;
