"use client";

import React, { memo, useCallback, useRef } from "react";
import "./MemberItem.scss";
import Avatar from "@/components/ui/Avatar/Avatar";
import { MEMBER_WITH_PROFILE } from "@/types/types";
import {
  EllipsisVerticalIcon,
  ShieldAlertIcon,
  TrashIcon,
} from "@/components/ui/Icons";
import Popover from "@/components/ui/Popover/Popover";
import classNames from "classnames";
import { MemberRole } from "@prisma/client";
import { CurrentServerStore } from "@/stores/useCurrentServerStore";

type MemberItemPropsType = {
  memberItem: MEMBER_WITH_PROFILE;
};

const MemberItem = ({ memberItem }: MemberItemPropsType) => {
  const { profile } = memberItem;
  const { currentUserMember, updateMemberRole, removeMemberFromServer } =
    CurrentServerStore();
  const seeMoreRef = useRef<HTMLDivElement>(null);

  const currentUserProfile = currentUserMember?.profile;
  const isCurrentUser = currentUserProfile?.id === memberItem?.profile?.id;
  const isMemberModerator = memberItem?.role === MemberRole.MODERATOR;

  const getMemberDetails = useCallback(
    (handleClose: () => void) => {
      const handleRoleChange = async (newRole: MemberRole) => {
        await updateMemberRole(memberItem?.id, newRole);
        handleClose();
      };

      const handleRemoveMemberFromServer = async () => {
        await removeMemberFromServer(memberItem?.id);
        handleClose();
      };

      return (
        <div className="member-item-details-popover">
          {isMemberModerator && (
            <div
              className="member-item-details-popover-option-item"
              onClick={() => handleRoleChange(MemberRole.GUEST)}
            >
              Make Guest
            </div>
          )}

          {!isMemberModerator && (
            <div
              className="member-item-details-popover-option-item"
              onClick={() => handleRoleChange(MemberRole.MODERATOR)}
            >
              Make Moderator
            </div>
          )}

          <div
            className={classNames("member-item-details-popover-option-item", {
              isRed: true,
            })}
            onClick={handleRemoveMemberFromServer}
          >
            <span>Remove from Server</span>

            <TrashIcon size={16} />
          </div>
        </div>
      );
    },
    [
      isMemberModerator,
      memberItem?.id,
      removeMemberFromServer,
      updateMemberRole,
    ]
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

            {!isCurrentUser && (
              <span className="member-item-user-name-role">
                {isMemberModerator ? "Moderator" : "Guest"}
              </span>
            )}

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
