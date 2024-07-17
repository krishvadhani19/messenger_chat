"use client";

import "./UserDetail.scss";
import { memo, useCallback, useEffect } from "react";
import { logout } from "@/server/actions/logout";
import Avatar from "@/components/ui/Avatar/Avatar";
import { Profile } from "@prisma/client";
import LogoutIcon from "@/components/ui/Icons/LogoutIcon";
import Tooltip from "@/components/ui/Tooltip/Tooltip";

type UserDetailPropsType = { profile?: Profile };

const UserDetail = ({ profile }: UserDetailPropsType) => {
  const handleLogout = useCallback(async () => {
    await logout();
  }, []);

  return (
    <div className="user-details-container">
      <Avatar imageUrl={profile?.imageUrl!} imageName={profile?.name!} />

      <Tooltip title="Logout">
        <LogoutIcon
          className="user-details-logout"
          onClick={handleLogout}
          size={25}
        />
      </Tooltip>
    </div>
  );
};

export default memo(UserDetail);
