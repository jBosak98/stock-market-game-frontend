import { useQuery } from "urql";
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
    setUser: (user) => set({ user }, true),
  }))
);

export const useRefreshUser = () => {
  const setUser = useUser(({ setUser }) => setUser);
  const [{ data, fetching }] = useQuery<{ me: User }>({ query: meQuery });
  return () =>
    new Promise<{ me: User } | undefined>(
      (resolve) => !fetching && resolve(data)
    ).then((user) => {
      if (!user) {
        localStorage.setItem("token", "");
        return undefined;
      }
      const { me } = user;
      setUser && setUser(me);
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
        shares {
          companyId
          amount
          company{
            id
            ticker
            name
            quote{
              dailyChange
              currentPrice
            }
          }
        }
      }
    }
  }
`;

export default useUser;
