import { FULL_SERVER_TYPE } from "@/types/types";
import { Channel } from "@prisma/client";
import { create } from "zustand";

type CurrentServerStoreTypes = {
  currentServer: null | FULL_SERVER_TYPE;
  currentChannel: null | Channel;

  setCurrentServer: (server: FULL_SERVER_TYPE) => void;
  setCurrentChannel: (channel: Channel) => void;
};

const useCurrentServerStore = create<CurrentServerStoreTypes>((set, get) => ({
  currentServer: null,
  currentChannel: null,

  setCurrentServer: (server) => set({ currentServer: server }),
  setCurrentChannel: (channel) => set({ currentChannel: channel }),
}));

export const CurrentServerStore = useCurrentServerStore.getState();

export default useCurrentServerStore;
