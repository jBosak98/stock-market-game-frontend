import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Register from "../components/Register";
import Login from "../components/Login";

const AuthRoute = ({ match: { path } }: { match: { path: String } }) => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path={`${path}/register`} component={Register} />
          <Route exact path={`${path}/login`} component={Login} />
          <Redirect to="/auth/login" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default AuthRoute;
