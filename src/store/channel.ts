import { TChannel } from "@/interfaces";
import { create } from "zustand";

type ChannelStore = {
  channel: TChannel | null;
  actions: {
    setchannel: (channel: TChannel) => void;
  };
};

const initialState = {
  channel: {
    title: "",
    description: "",
    id: 0,
  },
};

const useChannelStore = create<ChannelStore>()((set) => ({
  ...initialState,
  actions: {
    setchannel: (channel) => set({ channel }),
  },
}));

export const useChannel = () => useChannelStore((state) => state.channel);
export const useChannelActions = () => useChannelStore((state) => state.actions);
