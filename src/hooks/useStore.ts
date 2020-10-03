import create from "zustand";
import { useQuery } from "urql";
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

export const useRefreshUser = () => {
  const setUser = useStore(({ setUser }) => setUser);
  const [{ data, fetching }] = useQuery<User>({ query: meQuery });
  return () =>
    new Promise<User>((resolve) => !fetching && resolve(data)).then((user) => {
      setUser && setUser(user);
      localStorage.setItem("token", user.token);
      return user;
    });
};
const meQuery = `
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
        }
      }
    }
  }
`;

export default useStore;
