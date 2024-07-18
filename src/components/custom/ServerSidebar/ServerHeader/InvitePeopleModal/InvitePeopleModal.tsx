"use client";

import { memo, useCallback, useState } from "react";
import "./InvitePeopleModal.scss";
import Modal from "@/components/ui/Modal/Modal";
import InputField from "@/components/ui/Input/InputField";
import { CircleCheckIcon, CopyIcon, RefreshIcon } from "@/components/ui/Icons";
import { APIRequest } from "@/utils/auth-util";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { Server } from "@prisma/client";

type InvitePeopleModalPropsType = {
  isOpen: boolean;
  onClose: (category: null) => void;
  inviteCode: string;
};

const InvitePeopleModal = ({
  isOpen,
  onClose,
  inviteCode,
}: InvitePeopleModalPropsType) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { serverId } = useParams();
  const [inviteLink, setInviteLink] = useState<string>(
    `${window.location.origin}/invite/${inviteCode}`
  );

  const generateNewInviteCode = useMutation({
    mutationFn: async () =>
      await APIRequest({
        method: "PATCH",
        url: `/api/servers/invite-code/${serverId}`,
        data: { serverId },
      }),
    onSuccess: (newData: Server) => {
      setInviteLink(`${window.location.origin}/invite/${newData?.inviteCode}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleNewInviteCodeClick = useCallback(() => {
    generateNewInviteCode.mutate();
  }, [generateNewInviteCode]);

  const handleClose = useCallback(() => {
    onClose(null);
  }, [onClose]);

  const handleCopyLink = useCallback(async () => {
    setIsCopied(true);
    await navigator.clipboard.writeText(inviteLink);

    setTimeout(() => setIsCopied((prev) => !prev), 1000);
  }, [inviteLink]);

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
            onClick={handleNewInviteCodeClick}
            aria-disabled={generateNewInviteCode.isPending}
          >
            {generateNewInviteCode.isPending
              ? "Generating new invite link"
              : " Generate new invite link"}

            <RefreshIcon size={14} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default memo(InvitePeopleModal);
