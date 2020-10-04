import { useState, useEffect } from "react";

import isLoggedIn from "../lib/isLoggedIn";
import useUser, { useRefreshUser } from "../hooks/useUser";
import { User } from "../lib/types";

const useSubscribedUser = () => {
  const [userInState, setUserState] = useState<User | undefined>(undefined);
  const refreshUser = useRefreshUser();
  const islocalStorageToken = isLoggedIn();
  !userInState?.token && islocalStorageToken && refreshUser();

  useEffect(
    () =>
      useUser.subscribe(
        (user: User | undefined | null) => setUserState(user || undefined),
        (state) => state.user
      ),
    []
  );
  const isUserLoggedIn = !!userInState?.token || islocalStorageToken;
  return [userInState, isUserLoggedIn];
};

export default useSubscribedUser;
