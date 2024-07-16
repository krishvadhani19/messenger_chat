import React, { memo } from "react";
import "./MemberItem.scss";
import { Member } from "@prisma/client";

type MemberItemPropsType = {
  memberItem: Member;
};

const MemberItem = ({ memberItem }: MemberItemPropsType) => {
  return <div>{memberItem?.id}</div>;
};

export default memo(MemberItem);
