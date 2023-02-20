import { TChannel } from "@/interfaces";
import { create } from "zustand";

type ChannelStore = {
  channel: TChannel | null;
  isLoaded: boolean;
  newMessages: number;
  actions: {
    setchannel: (channel: TChannel) => void;
    setIsLoaded: (isLoaded: boolean) => void;
    setNewMessages: (messages: number) => void;
  };
};

const initialState = {
  channel: {
    title: "",
    description: "",
    id: 0,
  },
  newMessages: 0,
  isLoaded: false,
};

const useChannelStore = create<ChannelStore>()((set) => ({
  ...initialState,
  actions: {
    setchannel: (channel) => set({ channel }),
    setIsLoaded: (isLoaded) => set({ isLoaded }),
    setNewMessages: (newMessages) => set({ newMessages }),
  },
}));

export const useChannel = () => useChannelStore((state) => state.channel);
export const useMessageIsLoaded = () =>
  useChannelStore((state) => state.isLoaded);
export const useNewMessages = () =>
  useChannelStore((state) => state.newMessages);
export const useChannelActions = () =>
  useChannelStore((state) => state.actions);
