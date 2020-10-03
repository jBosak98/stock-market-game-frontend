import React from "react";
import { Route, Redirect } from "react-router-dom";

import useSubscribedUser from "../hooks/useSubscribedUser";

type PublicRouteProps = {
  component: React.FC;
  exact: boolean;
  path: string;
};
const PublicRoute: React.FC<any> = ({ component: Component, ...restProps }) => {
  const [user, isLoggedIn] = useSubscribedUser();

  return (
    <Route
      {...restProps}
      render={(props: any) =>
        isLoggedIn ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
