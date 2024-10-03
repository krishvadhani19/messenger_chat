import { FULL_SERVER_TYPE, MEMBER_WITH_PROFILE } from "@/types/types";
import { create } from "zustand";

type CurrentServerStoreTypes = {
  currentServer: null | FULL_SERVER_TYPE;
  currentUserMember: null | MEMBER_WITH_PROFILE;

  setCurrentServer: (server: FULL_SERVER_TYPE) => void;
  setCurrentUserMember: (member: MEMBER_WITH_PROFILE) => void;
};

const useCurrentServerStore = create<CurrentServerStoreTypes>((set, get) => ({
  currentServer: null,
  currentUserMember: null,

  setCurrentServer: () => {},
    setCurrentUserMember: (member: MEMBER_WITH_PROFILE) => {
      
  },
}));

export const CurrentServerStore = useCurrentServerStore.getState();

export default useCurrentServerStore;
