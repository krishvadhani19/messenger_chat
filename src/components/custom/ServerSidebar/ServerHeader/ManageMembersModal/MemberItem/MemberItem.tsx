"use client";

import React, { memo, useCallback, useContext, useMemo, useRef } from "react";
import "./MemberItem.scss";
import Avatar from "@/components/ui/Avatar/Avatar";
import { MEMBER_WITH_PROFILE } from "@/types/types";
import {
  EllipsisVerticalIcon,
  ShieldAlertIcon,
  TickIcon,
  TrashIcon,
} from "@/components/ui/Icons";
import Popover from "@/components/ui/Popover/Popover";
import { CurrentUserMemberContext } from "@/contexts/CurrentUserMemberContext";
import classNames from "classnames";
import { MemberRole } from "@prisma/client";

type MemberItemPropsType = {
  memberItem: MEMBER_WITH_PROFILE;
};

const MemberItem = ({ memberItem }: MemberItemPropsType) => {
  const { profile } = memberItem;
  const currentUserMember = useContext(CurrentUserMemberContext);
  const seeMoreRef = useRef<HTMLDivElement>(null);

  const currentUserProfile = currentUserMember;
  const isCurrentUser =
    currentUserProfile?.profile?.id === memberItem?.profile?.id;
  const isCurrentUserModerator =
    currentUserMember?.role === MemberRole.MODERATOR;

  const getMemberDetails = useCallback(
    (handleClose: any) => {
      return (
        <div className="member-item-details-popover">
          <div className="member-item-details-popover-option-item">
            {!isCurrentUserModerator && <>Make</>} Guest
            {isCurrentUserModerator && <TickIcon size={16} color="#22c55e" />}
          </div>

          <div className="member-item-details-popover-option-item">
            {isCurrentUserModerator && <>Make</>} Moderator
            {!isCurrentUserModerator && <TickIcon size={16} color="#22c55e" />}
          </div>

          <div
            className={classNames("member-item-details-popover-option-item", {
              isRed: true,
            })}
          >
            <span>Remove from Server</span>

            <TrashIcon size={16} />
          </div>
        </div>
      );
    },
    [isCurrentUserModerator]
  );

  return (
    <div className="member-item-container">
      <div className="flex-center gap-1">
        <Avatar
          imageUrl={profile?.imageUrl || "/fallback_profile_image"}
          imageName={profile?.name || "user_profile"}
        />

        <div className="member-item-user-details">
          <div className="member-item-user-name">
            {profile?.name}

            {isCurrentUser && <ShieldAlertIcon size={16} color="#f43f5e" />}
          </div>

          <div className="member-item-user-email">{profile?.email}</div>
        </div>
      </div>

      {!isCurrentUser && (
        <EllipsisVerticalIcon
          ref={seeMoreRef}
          size={18}
          color="#374151"
          className="member-item-see-more"
        />
      )}

      <Popover anchorRef={seeMoreRef}>{getMemberDetails}</Popover>
    </div>
  );
};

export default memo(MemberItem);
