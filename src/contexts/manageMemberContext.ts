import { FULL_SERVER_TYPE } from "@/types/types";
import { MemberRole } from "@prisma/client";
import { createContext } from "react";

export const ManageMemberContext = createContext<{
  currentServer: FULL_SERVER_TYPE;
  updateMemberRole: (memberId: string, newRole: MemberRole) => Promise<void>;
  removeMemberFromServer: (memberId: string) => Promise<void>;
} | null>(null);
