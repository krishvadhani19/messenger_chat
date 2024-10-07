"use client";

import Modal from "@/components/ui/Modal/Modal";
import "./ManageMembersModal.scss";
import { memo, useCallback } from "react";
import MemberItem from "./MemberItem/MemberItem";
import useCurrentServerStore from "@/stores/useCurrentServerStore";

type ManageMembersModalPropsType = {
  isOpen: boolean;
  onClose: (val: null) => void;
};

const ManageMembersModal = ({
  isOpen,
  onClose,
}: ManageMembersModalPropsType) => {
  const handleClose = useCallback(() => {
    onClose(null);
  }, [onClose]);

  const { currentServer } = useCurrentServerStore();

  const members = currentServer?.members;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="manage-members-modal-container">
        <div className="manage-members-modal-header">
          <div className="manage-members-modal-header-title">
            Manage Members
          </div>

          <div className="manage-members-modal-header-sub-title">
            {members?.length} members
          </div>
        </div>

        <div className="manage-members-modal-member-list">
          {members?.map((memberItem, key) => (
            <MemberItem key={key} memberItem={memberItem} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default memo(ManageMembersModal);
