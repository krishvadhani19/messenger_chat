"use client";

import Button from "@/components/ui/Button/Button";
import "./UserDetail.scss";
import { memo, useCallback } from "react";
import { logout } from "@/server/actions/logout";
import Avatar from "@/components/ui/Avatar/Avatar";
import { Profile } from "@prisma/client";

type UserDetailPropsType = { profile?: Profile };

const UserDetail = ({}: UserDetailPropsType) => {
  const handleLogout = useCallback(async () => {
    await logout();
  }, []);

  return (
    <div className="user-details-container">
      {/* <Avatar imageUrl={profile?.imageUrl!} imageName={profile?.name!} /> */}
      <Button text="Logout" onClick={handleLogout} />;
    </div>
  );
};

export default memo(UserDetail);
