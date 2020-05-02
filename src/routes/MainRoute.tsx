import React from "react";
import { Switch, Redirect } from "react-router-dom";

import AddQuest from "../components/AddQuest";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";
import Group from "../components/Group";
import PublicRoute from "./PublicRoute";
import Home from "../components/Home";
import MakeTest from "../components/MakeTest";
import Settings from "../components/Settings";
import Tests from "../components/Tests";

function MainRoute() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/addquest" component={AddQuest} />
      <PrivateRoute exact path="/group" component={Group} />
      <PrivateRoute exact path="/maketest" component={MakeTest} />
      <PrivateRoute exact path="/settings" component={Settings} />
      <PrivateRoute exact path="/tests" component={Tests} />

      <PublicRoute path="/auth" component={AuthRoute} />
      <Redirect to="/" />
    </Switch>
  );
}

export default MainRoute;
