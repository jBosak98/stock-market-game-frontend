import create from "zustand";
import { useQuery } from "urql";
import { devtools } from "zustand/middleware";
import { useUserContext } from "../contexts/UserContext";

import { User } from "../lib/types";

export type UserStore = {
  user?: User;
  setUser: (user?: User) => any;
};
const useUser = () => {
  const [{ data }] = useQuery<User>({ query: meQuery });

  const store = create<UserStore>(
    devtools((set) => ({
      user: data,
      setUser: (user) => set({ user }, true),
    }))
  );
  return store;
};

export const useRefreshUser = () => {
  const setUser = useUserContext()(({ setUser }) => setUser);
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

export default useUser;
