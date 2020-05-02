import React from "react";
import { Route, Redirect } from "react-router-dom";

import isLoggedIn from "../lib/isLoggedIn";

type PublicRouteProps = {
  component: React.FC;
  exact: boolean;
  path: string;
};
const PublicRoute: React.FC<any> = ({ component: Component, ...restProps }) => {
  const isUserLoggedIn = isLoggedIn();
  return (
    <Route
      {...restProps}
      render={(props: any) =>
        isUserLoggedIn ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
