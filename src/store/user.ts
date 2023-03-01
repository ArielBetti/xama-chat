"use client";

import { IUser, TConnections } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  channels: TConnections[];
  user: IUser | null;
  actions: {
    setChannels: (channels: TConnections[]) => void;
    setUser: (user: IUser) => void;
    logout: () => void;
  };
};

const initialState = {
  channels: [],
  user: {
    sessionId: "",
    name: "",
    email: "",
    picture: "",
  },
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        setChannels: (channels) => set({ channels }),
        setUser: (user) => set({ user }),
        logout: () => {
          set({ ...initialState });
        },
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);

export const useUserConnections = () => useAuthStore((state) => state.channels);
export const useUser = () => useAuthStore((state) => state.user);
export const useAuthActions = () => useAuthStore((state) => state.actions);
