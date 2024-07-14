"use client";

import { memo, useCallback } from "react";
import "./InvitePeopleModal.scss";
import Modal from "@/components/ui/Modal/Modal";

type InvitePeopleModalPropsType = {
  isOpen: boolean;
  onClose: (category: null) => void;
};

const InvitePeopleModal = ({ isOpen, onClose }: InvitePeopleModalPropsType) => {
  const handleClose = useCallback(() => {
    onClose(null);
  }, [onClose]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="invite-people-container">
        <div className="invite-people-header">Invite People</div>
      </div>
    </Modal>
  );
};

export default memo(InvitePeopleModal);
