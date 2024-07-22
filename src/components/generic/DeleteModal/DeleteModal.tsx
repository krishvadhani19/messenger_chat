"use client";

import Modal from "@/components/ui/Modal/Modal";
import "./DeleteModal.scss";
import { memo, useCallback } from "react";
import Button from "@/components/ui/Button/Button";
import { useRouter } from "next/navigation";

type DeleteServerModalPropsType = {
  isOpen: boolean;
  onClose: (val: null) => void;
  deleteItemHeader: string;
  deleteItemName: string;
  confirmButtonText: string;
  confirmChanges: () => Promise<void>;
};

const DeleteModal = ({
  isOpen,
  onClose,
  deleteItemHeader,
  deleteItemName,
  confirmButtonText,
  confirmChanges,
}: DeleteServerModalPropsType) => {
  const router = useRouter();

  const handleClose = useCallback(() => {
    onClose(null);
  }, [onClose]);

  const handleConfirm = useCallback(async () => {
    await confirmChanges();

    router.refresh();

    handleClose();
  }, [confirmChanges, handleClose, router]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="delete-modal-container">
        <div className="delete-modal-header">{deleteItemHeader}</div>

        <div className="delete-modal-title">
          <div>Are you sure you want to do this?</div>
          <span style={{ color: "#8b5cf6" }}>{deleteItemName}</span> will be
          permanently deleted?
        </div>

        <div className="delete-modal-options">
          <Button
            text="Cancel"
            type="secondary"
            onClick={handleClose}
            isFullWidth={false}
          />

          <Button
            text={confirmButtonText}
            onClick={handleConfirm}
            isFullWidth={false}
          />
        </div>
      </div>
    </Modal>
  );
};

export default memo(DeleteModal);
