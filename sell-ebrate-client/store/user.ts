import { create } from "zustand";

interface UserStateType {
  token: string;
  setToken: (token: string) => void;
  removeToken: () => void;
}

const getTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || "";
  }
  return "";
};

const token = getTokenFromLocalStorage();

export const useUserStore = create<UserStateType>((set) => ({
  token: token,
  setToken: (token: string) => set({ token: token }),
  removeToken: () => set({ token: "" }),
}));
