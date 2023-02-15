'use client'

import { IUser } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  user: IUser | null;
  actions: {
    setUser: (user: IUser) => void;
    logout: () => void;
  };
};

const initialState = {
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
        setUser: (user) => set({ user }),
        logout: () => {
          set({ ...initialState })
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

export const useUser = () => useAuthStore((state) => state.user);
export const useAuthActions = () => useAuthStore((state) => state.actions);
