import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import SimpleAppBar from "./SimpleAppBar";
import SimpleDrawer from "./SimpleDrawer";
import AddQuest from "./AddQuest";
import Group from "./Group";
import Home from "./Home";

import MakeTest from "./MakeTest";
import Settings from "./Settings";
import Tests from "./Tests";
import AuthRoute from "./AuthRoute";

function MainRoute() {
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(true);
  const isLoggedIn = true;

  return (
    <BrowserRouter>
      <SimpleAppBar
        isDrawerOpened={isDrawerOpened}
        setIsDrawerOpened={setIsDrawerOpened}
      />
      {isLoggedIn && (
        <SimpleDrawer
          setIsDrawerOpened={setIsDrawerOpened}
          isDrawerOpened={isDrawerOpened}
        />
      )}
      <div className="main-content">
        <div className="appbar-space" />
        <div className="main-container">
          <_MainSwitch isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </BrowserRouter>
  );
}

const _MainSwitch = ({ isLoggedIn }: { isLoggedIn: Boolean }) => (
  <Switch>
    {isLoggedIn && (
      <>
        <Route exact path="/" component={Home} />
        <Route exact path="/addquest" component={AddQuest} />
        <Route exact path="/group" component={Group} />
        <Route exact path="/maketest" component={MakeTest} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/tests" component={Tests} />
        <Redirect to="/" />
      </>
    )}
    <Route path="/auth" component={AuthRoute} />
    <Redirect to="/auth" />
  </Switch>
);

export default MainRoute;
