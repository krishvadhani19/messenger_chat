"use client";

import { FULL_SERVER_TYPE } from "@/types/types";
import "./ServerHeader.scss";
import { memo, useCallback, useRef } from "react";
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

type ServerHeaderPropsType = {
  currentServer: FULL_SERVER_TYPE;
  currentUserRole: MemberRole;
};

const ServerHeader = ({
  currentServer,
  currentUserRole,
}: ServerHeaderPropsType) => {
  const serverHeaderRef = useRef<HTMLDivElement>(null);

  const handleDropdownClick = useCallback(() => {}, []);

  const isAdmin = currentUserRole === MemberRole.ADMIN;
  const isModerator = isAdmin || currentUserRole === MemberRole.MODERATOR;

  const getServerHeaderPopover = useCallback(
    (handleClose: any) => {
      return (
        <div className="server-header-popover">
          {isModerator && (
            <div
              className="server-header-popover-item-container"
              onClick={handleClose}
            >
              <div className="">Invite People</div>

              <AddUserIcon size={18} />
            </div>
          )}

          {isAdmin && (
            <div className="server-header-popover-item-container">
              <div className="">Server Setting</div>

              <SettingsIcon size={18} />
            </div>
          )}

          {isAdmin && (
            <div className="server-header-popover-item-container">
              <div className="">Manage Members</div>

              <MultipleUsersIcon size={18} />
            </div>
          )}

          {isModerator && (
            <div className="server-header-popover-item-container">
              <div className="">Create Chanel</div>

              <CirclePlayIcon size={18} />
            </div>
          )}

          {isAdmin && (
            <div
              className={classNames("server-header-popover-item-container", {
                isRed: true,
              })}
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
            >
              <div className="">Leave Server</div>

              <LogoutIcon size={18} />
            </div>
          )}
        </div>
      );
    },
    [isAdmin, isModerator]
  );

  return (
    <>
      <div
        className="server-header-container"
        onClick={handleDropdownClick}
        ref={serverHeaderRef}
      >
        <div>{currentServer?.name}</div>

        <ChevronDownIcon size={20} />
      </div>

      <Popover anchorRef={serverHeaderRef}>{getServerHeaderPopover}</Popover>
    </>
  );
};

export default memo(ServerHeader);
