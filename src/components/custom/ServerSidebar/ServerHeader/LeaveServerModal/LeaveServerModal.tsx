import React, { memo, useCallback, useContext } from "react";
import "./LeaveServerModal.scss";
import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button/Button";
import { useParams, useRouter } from "next/navigation";
import { ServerSidebarContext } from "@/contexts/ServerSidebarContext";
import { APIRequest } from "@/utils/auth-util";

type LeaveServerModalPropsType = {
  isOpen: boolean;
  onClose: (val: null) => void;
};

const LeaveServerModal = ({ isOpen, onClose }: LeaveServerModalPropsType) => {
  const router = useRouter();
  const { currentServer, currentUserMember } = useContext(ServerSidebarContext);

  const handleClose = useCallback(() => {
    onClose(null);
  }, [onClose]);

  const handleConfirm = useCallback(async () => {
    await APIRequest({
      method: "DELETE",
      url: `/api/members/delete-member/${currentUserMember?.id}`,
    });

    router.refresh();

    handleClose();
  }, [currentUserMember?.id, handleClose, router]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="delete-server-modal-container">
        <div className="delete-server-modal-header">Leave Server</div>

        <div className="delete-server-modal-title">
          <div>Are you sure you want to do this?</div>
          <span style={{ color: "#8b5cf6" }}>{currentServer?.name}</span> will
          be permanently left.
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

export default memo(LeaveServerModal);
