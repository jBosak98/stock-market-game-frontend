import create from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "../lib/types";

export type Store = {
  user?: User;
  setUser: (user?: User) => any;
};
const useStore = create<Store>(
  devtools((set) => ({
    user: undefined,
    setUser: (user) => set({ user }, true),
  }))
);

export default useStore;
