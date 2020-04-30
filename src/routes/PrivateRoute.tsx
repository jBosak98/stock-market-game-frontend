import React from "react";
import { Route, Redirect } from "react-router-dom";

import isLoggedIn from "../lib/isLoggedIn";

type PrivateRouteProps = {
  component: React.FC;
  exact: boolean;
  path: string;
};
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...restProps
}) => {
  const isUserLoggedIn = isLoggedIn();
  return (
    <Route
      {...restProps}
      render={(props: any) =>
        isUserLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
