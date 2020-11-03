import { useQuery } from "urql";
import { useCallback } from "react";
import create from "zustand";
import { devtools } from "zustand/middleware";

import { User } from "../lib/types";

export type UserStore = {
  user?: User;
  setUser: (user?: User) => any;
};

const useUser = create<UserStore>(
  devtools((set) => ({
    user: undefined,
    setUser: (user) => set({ user }),
  }))
);

export const useRefreshUser = () => {
  const setUser = useCallback(
    useUser(({ setUser }) => setUser),
    []
  );
  const [{ data, fetching }, refetch] = useQuery<{ me: User }>({
    query: meQuery,
    requestPolicy: "cache-and-network",
  });
  return () =>
    new Promise<{ me: User } | undefined>(
      (resolve) => !fetching && resolve(data)
    ).then((user) => {
      if (!user) {
        localStorage.setItem("token", "");
        return undefined;
      }
      const { me } = user;
      me && setUser && setUser(me);
      const { token } = me || {};
      token && localStorage.setItem("token", token);
      return me;
    });
};

export const meQuery = `
  query me {
    me {
      id
      token
      email
      assets {
        money
        accountValue
        shares {
          companyId
          amount
          totalGain
          totalGainPercentage
          company{
            id
            ticker
            name
            quote{
              dailyChange
              dailyChangePercentage
              currentPrice
            }
          }
        }
      }
    }
  }
`;

export default useUser;
