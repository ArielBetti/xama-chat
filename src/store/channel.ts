import { TChannel } from "@/interfaces";
import { create } from "zustand";

type ChannelStore = {
  channel: TChannel | null;
  isLoaded: boolean;
  actions: {
    setchannel: (channel: TChannel) => void;
    setIsLoaded: (isLoaded: boolean) => void;
  };
};

const initialState = {
  channel: {
    title: "",
    description: "",
    id: 0,
  },
  isLoaded: false,
};

const useChannelStore = create<ChannelStore>()((set) => ({
  ...initialState,
  actions: {
    setchannel: (channel) => set({ channel }),
    setIsLoaded: (isLoaded) => {
      return set({ isLoaded });
    },
  },
}));

export const useChannel = () => useChannelStore((state) => state.channel);
export const useMessageIsLoaded = () =>
  useChannelStore((state) => state.isLoaded);
export const useChannelActions = () =>
  useChannelStore((state) => state.actions);
