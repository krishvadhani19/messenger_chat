"use client";

import "./ServerHeader.scss";
import { memo, useCallback, useRef, useState } from "react";
import {
  AddUserIcon,
  ChevronDownIcon,
  CirclePlayIcon,
  SettingsIcon,
  TrashIcon,
  LogoutIcon,
} from "@/components/ui/Icons";
import Popover from "@/components/ui/Popover/Popover";
import MultipleUsersIcon from "@/components/ui/Icons/MultipleUsersIcon";
import { MemberRole } from "@prisma/client";
import classNames from "classnames";
import InvitePeopleModal from "./InvitePeopleModal/InvitePeopleModal";
import ServerSettingsModal from "./ServerSettingsModal/ServerSettingsModal";
import ManageMembersModal from "./ManageMembersModal/ManageMembersModal";
import CreateChannelModal from "./CreateChannelModal/CreateChannelModal";
import DeleteServerModal from "./DeleteServerModal/DeleteServerModal";
import LeaveServerModal from "./LeaveServerModal/LeaveServerModal";
import { CurrentUserStore } from "@/stores/useCurrentUser";
import useCurrentServerStore from "@/stores/useCurrentServer";

const CURRENT_MODAL_CATEGORIES = {
  INVITE_PEOPLE: "INVITE_PEOPLE",
  SERVER_SETTINGS: "SERVER_SETTINGS",
  MANAGE_MEMBERS: "MANAGE_MEMBERS",
  CREATE_CHANNEL: "CREATE_CHANNEL",
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
  const { currentServer } = useCurrentServerStore();
  const currentUserMember = CurrentUserStore().currentUserMember;

  const currentMemberRole = currentUserMember?.role;

  const isAdmin = currentMemberRole === MemberRole.ADMIN;
  const isModerator = isAdmin || currentMemberRole === MemberRole.MODERATOR;

  const handleModalChange = useCallback(
    (category: CURRENT_MODAL_TYPES | null) => {
      setCurrentModal(category);
    },
    []
  );

  const getServerHeaderPopover = useCallback(
    (handleClose: () => void) => {
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
                handleModalChange(CURRENT_MODAL_CATEGORIES.CREATE_CHANNEL);
                handleClose();
              }}
            >
              <div className="">Create Channel</div>

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

      {currentModal === CURRENT_MODAL_CATEGORIES.INVITE_PEOPLE && (
        <InvitePeopleModal
          isOpen
          onClose={handleModalChange}
          inviteCode={currentServer?.inviteCode!}
        />
      )}

      {currentModal === CURRENT_MODAL_CATEGORIES.SERVER_SETTINGS && (
        <ServerSettingsModal isOpen onClose={handleModalChange} />
      )}

      {currentModal === CURRENT_MODAL_CATEGORIES.MANAGE_MEMBERS && (
        <ManageMembersModal isOpen onClose={handleModalChange} />
      )}

      {currentModal === CURRENT_MODAL_CATEGORIES.CREATE_CHANNEL && (
        <CreateChannelModal isOpen onClose={handleModalChange} />
      )}

      {currentModal === CURRENT_MODAL_CATEGORIES.DELETE_SERVER && (
        <DeleteServerModal isOpen onClose={handleModalChange} />
      )}

      {currentModal === CURRENT_MODAL_CATEGORIES.LEAVE_SERVER && (
        <LeaveServerModal isOpen onClose={handleModalChange} />
      )}
    </>
  );
};

export default memo(ServerHeader);
