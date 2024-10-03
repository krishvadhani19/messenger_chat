import { MEMBER_WITH_PROFILE } from "@/types/types";
import { Profile } from "@prisma/client";
import { create } from "zustand";

type CurrentServerStoreTypes = {
  currentUser: null | Profile;
  currentUserMember: null | MEMBER_WITH_PROFILE;

  setCurrentUser: (profile: Profile | null) => void;
  setCurrentUserMember: (userMember: MEMBER_WITH_PROFILE | null) => void;
};

const useCurrentUserStore = create<CurrentServerStoreTypes>((set, get) => ({
  currentUser: null,
  currentUserMember: null,

  setCurrentUser: (profile) => set({ currentUser: profile }),
  setCurrentUserMember: (userMember) => set({ currentUserMember: userMember }),
}));

export const CurrentUserStore = useCurrentUserStore.getState;

export default useCurrentUserStore;
