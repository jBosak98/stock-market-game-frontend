import React, { useContext, createContext, ReactNode } from "react";
import create, { UseStore } from "zustand";
import { devtools } from "zustand/middleware";

import useUser, { UserStore } from "../hooks/useUser";

type UserContextType = () => UseStore<UserStore>;

const UserContext = createContext<UserContextType>(() =>
  create<UserStore>(
    devtools((set) => ({
      user: undefined,
      setUser: (user) => set({ user }, true),
    }))
  )
);

const useUserContext = () => useContext(UserContext)();

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserContext.Provider value={useUser}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider, useUserContext };
