"use client";

import { FULL_SERVER_TYPE, MEMBER_WITH_PROFILE } from "@/types/types";
import "./ServerHeader.scss";
import { memo, useCallback, useContext, useRef, useState } from "react";
import {
  AddUserIcon,
  ChevronDownIcon,
  CirclePlayIcon,
  SettingsIcon,
  TrashIcon,
} from "@/components/ui/Icons";
import Popover from "@/components/ui/Popover/Popover";
import MultipleUsersIcon from "@/components/ui/Icons/MultipleUsersIcon";
import { MemberRole } from "@prisma/client";
import classNames from "classnames";
import LogoutIcon from "@/components/ui/Icons/LogoutIcon";
import InvitePeopleModal from "./InvitePeopleModal/InvitePeopleModal";
import ServerSettingsModal from "./ServerSettingsModal/ServerSettingsModal";
import ManageMembersModal from "./ManageMembersModal/ManageMembersModal";
import { ServerSidebarContext } from "@/contexts/ServerSidebarContext";

const CURRENT_MODAL_CATEGORIES = {
  INVITE_PEOPLE: "INVITE_PEOPLE",
  SERVER_SETTINGS: "SERVER_SETTINGS",
  MANAGE_MEMBERS: "MANAGE_MEMBERS",
  CREATE_CHANEL: "CREATE_CHANEL",
  DELETE_SERVER: "DELETE_SERVER",
  LEAVE_SERVER: "LEAVE_SERVER",
} as const;

type CURRENT_MODAL_TYPES =
  (typeof CURRENT_MODAL_CATEGORIES)[keyof typeof CURRENT_MODAL_CATEGORIES];

const ServerHeader = () => {
  const serverHeaderRef = useRef<HTMLDivElement>(null);
  const [currentModal, setCurrentModal] = useState<CURRENT_MODAL_TYPES | null>(
    null
  );
  const { currentUserMember, currentServer } = useContext(ServerSidebarContext);

  const { role: currentMemberRole } = currentUserMember;

  const isAdmin = currentMemberRole === MemberRole.ADMIN;
  const isModerator = isAdmin || currentMemberRole === MemberRole.MODERATOR;

  const handleModalChange = useCallback(
    (category: CURRENT_MODAL_TYPES | null) => {
      setCurrentModal(category);
    },
    []
  );

  const getServerHeaderPopover = useCallback(
    (handleClose: any) => {
      return (
        <div className="server-header-popover">
          {isModerator && (
            <div
              className="server-header-popover-item-container"
              onClick={() => {
                handleModalChange(CURRENT_MODAL_CATEGORIES.INVITE_PEOPLE);
                handleClose();
              }}
            >
              <div className="">Invite People</div>

              <AddUserIcon size={18} />
            </div>
          )}

          {isAdmin && (
            <div
              className="server-header-popover-item-container"
              onClick={() => {
                handleModalChange(CURRENT_MODAL_CATEGORIES.SERVER_SETTINGS);
                handleClose();
              }}
            >
              <div className="">Server Settings</div>

              <SettingsIcon size={18} />
            </div>
          )}

          {isAdmin && (
            <div
              className="server-header-popover-item-container"
              onClick={() => {
                handleModalChange(CURRENT_MODAL_CATEGORIES.MANAGE_MEMBERS);
                handleClose();
              }}
            >
              <div className="">Manage Members</div>

              <MultipleUsersIcon size={18} />
            </div>
          )}

          {isModerator && (
            <div
              className="server-header-popover-item-container"
              onClick={() => {
                handleModalChange(CURRENT_MODAL_CATEGORIES.CREATE_CHANEL);
                handleClose();
              }}
            >
              <div className="">Create Chanel</div>

              <CirclePlayIcon size={18} />
            </div>
          )}

          {isAdmin && (
            <div
              className={classNames("server-header-popover-item-container", {
                isRed: true,
              })}
              onClick={() => {
                handleModalChange(CURRENT_MODAL_CATEGORIES.DELETE_SERVER);
                handleClose();
              }}
            >
              <div className="">Delete Server</div>

              <TrashIcon size={18} />
            </div>
          )}

          {!isAdmin && (
            <div
              className={classNames("server-header-popover-item-container", {
                isRed: true,
              })}
              onClick={() => {
                handleModalChange(CURRENT_MODAL_CATEGORIES.LEAVE_SERVER);
                handleClose();
              }}
            >
              <div className="">Leave Server</div>

              <LogoutIcon size={18} />
            </div>
          )}
        </div>
      );
    },
    [handleModalChange, isAdmin, isModerator]
  );

  return (
    <>
      <div className="server-header-container" ref={serverHeaderRef}>
        <div>{currentServer?.name}</div>

        <ChevronDownIcon size={20} />
      </div>

      <Popover anchorRef={serverHeaderRef}>{getServerHeaderPopover}</Popover>

      <InvitePeopleModal
        isOpen={currentModal === CURRENT_MODAL_CATEGORIES.INVITE_PEOPLE}
        onClose={handleModalChange}
        inviteCode={currentServer?.inviteCode}
      />

      <ServerSettingsModal
        isOpen={currentModal === CURRENT_MODAL_CATEGORIES.SERVER_SETTINGS}
        onClose={handleModalChange}
        currentServer={currentServer}
      />

      <ManageMembersModal
        isOpen={currentModal === CURRENT_MODAL_CATEGORIES.MANAGE_MEMBERS}
        onClose={handleModalChange}
      />
    </>
  );
};

export default memo(ServerHeader);
