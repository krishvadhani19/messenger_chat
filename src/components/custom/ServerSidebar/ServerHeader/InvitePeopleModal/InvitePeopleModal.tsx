"use client";

import { memo, useCallback, useState } from "react";
import "./InvitePeopleModal.scss";
import Modal from "@/components/ui/Modal/Modal";
import InputField from "@/components/ui/Input/InputField";
import { CircleCheckIcon, CopyIcon, RefreshIcon } from "@/components/ui/Icons";
import { APIRequest } from "@/utils/auth-util";

type InvitePeopleModalPropsType = {
  isOpen: boolean;
  onClose: (category: null) => void;
};

const InvitePeopleModal = ({ isOpen, onClose }: InvitePeopleModalPropsType) => {
  const [inviteLink, setInviteLink] = useState<string>(
    `${window.location.origin}/invite/${crypto.randomUUID()}`
  );

  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    onClose(null);
  }, [onClose]);

  const handleCopyLink = useCallback(async () => {
    setIsCopied(true);
    await navigator.clipboard.writeText(inviteLink);

    setTimeout(() => setIsCopied((prev) => !prev), 1500);
  }, [inviteLink]);

  const generateNewServerLink = useCallback(async () => {
    try {
      const data = await APIRequest({ method: "POST", url: "" });
      setInviteLink(`${window.location.origin}/invite/${crypto.randomUUID()}`);
    } catch (error) {}
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="invite-people-container">
        <div className="invite-people-header">Invite People</div>

        <div className="invite-people-main">
          <div className="invite-people-link">
            <InputField
              label="SERVER INVITE LINK"
              disabled
              inputValue={inviteLink}
            />

            {isCopied ? (
              <CircleCheckIcon
                className="invite-people-link-copy-icon"
                color="#22c55e"
              />
            ) : (
              <CopyIcon
                onClick={handleCopyLink}
                className="invite-people-link-copy-icon"
              />
            )}
          </div>

          <div
            className="invite-people-generate-new-link"
            onClick={generateNewServerLink}
          >
            Generate new invite link
            <RefreshIcon size={14} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default memo(InvitePeopleModal);
