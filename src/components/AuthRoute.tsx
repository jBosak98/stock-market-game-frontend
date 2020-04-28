import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import SimpleAppBar from "./SimpleAppBar";
import Register from "./Register";
import Login from "./Login";

const AuthRoute = ({ match: { path } }: { match: { path: String } }) => {
  return (
    <>
      <BrowserRouter>
        <SimpleAppBar isDrawerOpened={false} setIsDrawerOpened={() => {}} />
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
