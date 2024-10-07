import { Profile } from "@prisma/client";
import { create } from "zustand";

type CurrentServerStoreTypes = {
  currentUser: null | Profile;

  setCurrentUser: (profile: Profile | null) => void;
};

const useCurrentUserStore = create<CurrentServerStoreTypes>((set, get) => ({
  currentUser: null,

  setCurrentUser: (profile) => set({ currentUser: profile }),
}));

export const CurrentUserStore = useCurrentUserStore.getState;

export default useCurrentUserStore;
