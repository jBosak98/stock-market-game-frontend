import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SimpleAppBar from "./SimpleAppBar";
import SimpleDrawer from "./SimpleDrawer";
import AddQuest from "./AddQuest";
import Group from "./Group";
import Home from "./Home";
import MakeTest from "./MakeTest";
import Settings from "./Settings";
import Tests from "./Tests";

type DrawerProps = {
  isDrawerOpened: boolean;
  setIsDrawerOpened: (drawerState: boolean) => any;
};

function MainRoute(props: DrawerProps) {
  return (
    <Router>
      <SimpleAppBar {...props} />
      <SimpleDrawer {...props} />
      <div className="main-content">
        <div />
        <_MainSwitch />
      </div>
    </Router>
  );
}

const _MainSwitch = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/addquest" component={AddQuest} />
    <Route exact path="/group" component={Group} />
    <Route exact path="/maketest" component={MakeTest} />
    <Route exact path="/settings" component={Settings} />
    <Route exact path="/tests" component={Tests} />
    <Route component={Home} />
  </Switch>
);

export default MainRoute;
