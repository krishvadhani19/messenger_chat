import Modal from "@/components/ui/Modal/Modal";
import "./DeleteServerModal.scss";
import { memo, useCallback, useContext } from "react";
import Button from "@/components/ui/Button/Button";
import { ServerSidebarContext } from "@/contexts/ServerSidebarContext";

type DeleteServerModalPropsType = {
  isOpen: boolean;
  onClose: (val: null) => void;
};

const DeleteServerModal = ({ isOpen, onClose }: DeleteServerModalPropsType) => {
  const handleClose = useCallback(() => {
    onClose(null);
  }, [onClose]);

  const handleConfirm = useCallback(async () => {
    handleClose();
  }, [handleClose]);

  const { currentServer } = useContext(ServerSidebarContext);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="delete-server-modal-container">
        <div className="delete-server-modal-header">Delete Server</div>

        <div className="delete-server-modal-title">
          <div>Are you sure you want to do this?</div>
          <span style={{ color: "#8b5cf6" }}>{currentServer?.name}</span> will
          be permanently deleted?
        </div>

        <div className="delete-server-modal-options">
          <Button
            text="Cancel"
            type="secondary"
            onClick={handleClose}
            isFullWidth={false}
          />

          <Button text="Confirm" onClick={handleConfirm} isFullWidth={false} />
        </div>
      </div>
    </Modal>
  );
};

export default memo(DeleteServerModal);
