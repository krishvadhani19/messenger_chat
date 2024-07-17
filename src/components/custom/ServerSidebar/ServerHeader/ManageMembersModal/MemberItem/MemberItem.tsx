"use client";

import React, { memo } from "react";
import "./MemberItem.scss";
import Avatar from "@/components/ui/Avatar/Avatar";
import { MEMBER_WITH_PROFILE } from "@/types/types";
import { EllipsisVerticalIcon } from "@/components/ui/Icons";

type MemberItemPropsType = {
  memberItem: MEMBER_WITH_PROFILE;
};

const MemberItem = ({ memberItem }: MemberItemPropsType) => {
  const { profile } = memberItem;

  return (
    <div className="member-item-container">
      <div className="flex-center gap-1">
        <Avatar
          imageUrl={profile?.imageUrl || "/fallback_profile_image"}
          imageName={profile?.name || "user_profile"}
        />

        <div className="member-item-user-details">
          <div className="member-item-user-name">{profile?.name}</div>

          <div className="member-item-user-email">{profile?.email}</div>
        </div>
      </div>

      <EllipsisVerticalIcon
        size={18}
        color="#374151"
        className="member-item-see-more"
      />
    </div>
  );
};

export default memo(MemberItem);
