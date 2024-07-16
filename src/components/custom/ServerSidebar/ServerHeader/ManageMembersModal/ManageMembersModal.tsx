"use client";

import Modal from "@/components/ui/Modal/Modal";
import "./ManageMembersModal.scss";
import { memo, useCallback } from "react";
import { Member } from "@prisma/client";
import MemberItem from "./MemberItem/MemberItem";

type ManageMembersModalPropsType = {
  isOpen: boolean;
  members: Member[];
  onClose: (val: null) => void;
};

const ManageMembersModal = ({
  isOpen,
  members,
  onClose,
}: ManageMembersModalPropsType) => {
  const handleClose = useCallback(() => {
    onClose(null);
  }, [onClose]);

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
          {members.map((memberItem, key) => (
            <MemberItem key={key} memberItem={memberItem} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default memo(ManageMembersModal);
