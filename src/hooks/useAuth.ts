import { useMutation, OperationResult } from "urql";
import { useHistory } from "react-router-dom";

import useStore from "./useStore";
import { User } from "../lib/types";

const loginQuery = `
  query login($user: UserLoginInput!){
    login(user:$user){
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

const registerMutation = `
  mutation register($user: UserRegisterInput!){
    register(user:$user){
      id
      token
      email
    }
  }
`;

type LoginVariables = { user: { email: string; password: string } };
type LoginResponse = {
  login: User;
};

const useLogin = (
  history: any
): ((args: LoginVariables) => Promise<OperationResult<LoginResponse>>) => {
  const setUser = useStore(({ setUser }) => setUser);
  const [_, loginFetch] = useMutation<LoginResponse, LoginVariables>(
    loginQuery
  );

  const login = async (
    args: LoginVariables
  ): Promise<OperationResult<LoginResponse>> => {
    const response = await loginFetch(args);

    if (!response.error) {
      if (response.data) {
        setUser && setUser(response.data.login);
        localStorage.setItem("token", response.data.login.token);
      }
      history.push("/");
    }
    return response;
  };
  return login;
};

export type RegisterVariables = {
  user: {
    email: string;
    password: string;
  };
};
type RegisterResponse = {
  register: {
    id: string;
  };
};

const useRegister = (
  history: any
): ((
  args: RegisterVariables
) => Promise<OperationResult<RegisterResponse>>) => {
  const [_, registerFetch] = useMutation<RegisterResponse, RegisterVariables>(
    registerMutation
  );

  const register = async (
    args: RegisterVariables
  ): Promise<OperationResult<RegisterResponse>> => {
    const response = await registerFetch(args);
    if (!response.error) {
      history.push("/auth/login");
    }
    return response;
  };
  return register;
};

const useAuth = () => {
  const history = useHistory();
  const login = useLogin(history);
  const register = useRegister(history);
  return { login, register };
};

export default useAuth;
