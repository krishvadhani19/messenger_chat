"use client";

import { FULL_SERVER_TYPE } from "@/types/types";
import "./ServerHeader.scss";
import { memo, useCallback, useRef } from "react";
import {
  AddUserIcon,
  ChevronDownIcon,
  SettingsIcon,
} from "@/components/ui/Icons";
import Popover from "@/components/ui/Popover/Popover";
import MultipleUsersIcon from "@/components/ui/Icons/MultipleUsersIcon";
import { MemberRole } from "@prisma/client";

type ServerHeaderPropsType = {
  currentServer: FULL_SERVER_TYPE;
};

const ServerHeader = ({ currentServer }: ServerHeaderPropsType) => {
  const serverHeaderRef = useRef<HTMLDivElement>(null);
  const handleDropdownClick = useCallback(() => {}, []);

  const getServerHeaderPopover = useCallback((handleClose: any) => {
    return (
      <div className="server-header-popover">
        <div className="server-header-popover-item-container">
          <div className="">Invite People</div>

          <AddUserIcon size={18} />
        </div>

        <div className="server-header-popover-item-container">
          <div className="">Server Setting</div>

          <SettingsIcon size={18} />
        </div>

        <div className="server-header-popover-item-container">
          <div className="">Manage Members</div>

          <MultipleUsersIcon size={18} />
        </div>
      </div>
    );
  }, []);

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
