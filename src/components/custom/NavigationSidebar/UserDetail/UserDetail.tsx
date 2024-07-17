"use client";

import Button from "@/components/ui/Button/Button";
import "./UserDetail.scss";
import { memo, useCallback } from "react";
import { logout } from "@/server/actions/logout";
import Avatar from "@/components/ui/Avatar/Avatar";
import { Profile } from "@prisma/client";
import LogoutIcon from "@/components/ui/Icons/LogoutIcon";

type UserDetailPropsType = { profile?: Profile };

const UserDetail = ({ profile }: UserDetailPropsType) => {
  const handleLogout = useCallback(async () => {
    await logout();
  }, []);

  return (
    <div className="user-details-container">
      <Avatar imageUrl={profile?.imageUrl!} imageName={profile?.name!} />

      <LogoutIcon
        className="user-details-logout"
        onClick={handleLogout}
        size={25}
      />
    </div>
  );
};

export default memo(UserDetail);
