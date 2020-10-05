import create from "zustand";
import { useQuery } from "urql";
import { devtools } from "zustand/middleware";
import { useUserContext } from "../contexts/UserContext";
import isLoggedIn from "../lib/isLoggedIn";

import { User } from "../lib/types";

export type UserStore = {
  user?: User;
  setUser: (user?: User) => any;
};
const useUser = () => {
  const [{ data, fetching }] = useQuery<{ me: User }>({ query: meQuery });

  const store = create<UserStore>(
    devtools((set) => ({
      user: data?.me,
      setUser: (user) => set({ user }, true),
    }))
  );
  const { user, setUser } = store();
  isLoggedIn() &&
    !user?.token &&
    new Promise<{ me?: User }>((resolve) => !fetching && resolve(data)).then(
      (user) => {
        user && setUser(user.me);
        const { token = null } = user?.me || {};
        token && localStorage.setItem("token", token);
      }
    );

  return store;
};

export const useRefreshUser = () => {
  const setUser = useUserContext()(({ setUser }) => setUser);
  const [{ data, fetching }] = useQuery<User>({ query: meQuery });
  return () =>
    new Promise<User>((resolve) => !fetching && resolve(data)).then((user) => {
      setUser && setUser(user);
      const { token } = user || {};
      token && localStorage.setItem("token", token);
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
