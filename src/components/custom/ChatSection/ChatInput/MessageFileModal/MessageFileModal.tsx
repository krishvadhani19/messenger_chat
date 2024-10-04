import React, { memo, useCallback } from "react";
import "./MessageFileModal.scss";
import Modal from "@/components/ui/Modal/Modal";

type ManageFileModalPropsType = {
  isOpen: boolean;
  onClose: (val: null) => void;
};

const MessageFileModal = ({ onClose }: ManageFileModalPropsType) => {
  const handleClose = useCallback(() => {
    onClose(null);
  }, [onClose]);

  return (
    <Modal isOpen onClose={handleClose}>
      <div>Message</div>
    </Modal>
  );
};

export default memo(MessageFileModal);
