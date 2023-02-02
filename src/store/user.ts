import { TGoogleUserMetadata } from "@/interfaces";
import { create } from "zustand";

type AuthStore = {
  user: TGoogleUserMetadata | null;
  actions: {
    setUser: (user: TGoogleUserMetadata) => void;
    logout: () => void;
  };
};

const initialState = {
  user: {
    avatar_url: "",
    email: "",
    email_verified: false,
    full_name: "",
    name: "",
    iss: "",
    picture: "",
    provider_id: "",
    sub: "",
  },
};

const useAuthStore = create<AuthStore>()((set) => ({
  ...initialState,
  actions: {
    setUser: (user) => set({ user }),
    logout: () => set({ ...initialState }),
  },
}));

export const useUser = () => useAuthStore(state => state.user)
export const useAuthActions = () => useAuthStore(state => state.actions);
