import { useState, useEffect } from "react";

import isLoggedIn from "../lib/isLoggedIn";
import { useRefreshUser } from "../hooks/useUser";
import { User } from "../lib/types";
import useUser from "./useUser";

const useSubscribedUser = () => {
  const [userInState, setUserState] = useState<User | undefined>(undefined);
  const refreshUser = useRefreshUser();
  const islocalStorageToken = isLoggedIn();
  !userInState?.token && islocalStorageToken && refreshUser();
  useEffect(
    () =>
      useUser.subscribe(
        (user: User | undefined | null) =>
          user && setUserState(user || undefined),
        (state) => state.user
      ),
    []
  );
  const isUserLoggedIn = !!userInState?.token || islocalStorageToken;
  return [userInState, isUserLoggedIn];
};

export default useSubscribedUser;
