import { MEMBER_WITH_PROFILE } from "@/types/types";
import { createContext } from "react";

export const CurrentUserMemberContext =
  createContext<MEMBER_WITH_PROFILE | null>(null);
