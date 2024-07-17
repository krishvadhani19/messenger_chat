import { MEMBER_WITH_PROFILE } from "@/types/types";
import { Profile } from "@prisma/client";
import { createContext } from "react";

export const CurrentUserMemberContext =
  createContext<MEMBER_WITH_PROFILE | null>(null);
