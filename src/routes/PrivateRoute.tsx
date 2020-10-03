import React from "react";
import { Route, Redirect } from "react-router-dom";

import useSubscribedUser from "../hooks/useSubscribedUser";

type PrivateRouteProps = {
  component: React.FC;
  exact: boolean;
  path: string;
};
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...restProps
}) => {
  const [user, isLoggedIn] = useSubscribedUser();

  return (
    <Route
      {...restProps}
      render={(props: any) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/auth/login" />
      }
    />
  );
};

export default PrivateRoute;
