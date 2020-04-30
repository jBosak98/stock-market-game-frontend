import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import AddQuest from "../components/AddQuest";
import AuthRoute from "./AuthRoute";
import Group from "../components/Group";
import Home from "../components/Home";
import MakeTest from "../components/MakeTest";
import Settings from "../components/Settings";
import SimpleAppBar from "../components/SimpleAppBar";
import SimpleDrawer from "../components/SimpleDrawer";
import Tests from "../components/Tests";
import isLoggedIn from "../lib/isLoggedIn";

const useStyles = makeStyles((theme) => ({
  content: {
    width: "100%",
    backgroundColor: theme.palette.background.default,
  },
  appbarSpace: {
    height: "64px",
    overflow: "auto",
  },
  mainContainer: {
    display: "flex",
    height: "calc(100vh - 64px)",
    overflow: "auto",
    width: "100%",
  },
}));

function MainRoute() {
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(true);
  const isUserLoggedIn = isLoggedIn();
  const styles = useStyles();
  return (
    <BrowserRouter>
      <SimpleAppBar
        isDrawerOpened={isDrawerOpened}
        setIsDrawerOpened={setIsDrawerOpened}
      />
      {isUserLoggedIn && (
        <SimpleDrawer
          setIsDrawerOpened={setIsDrawerOpened}
          isDrawerOpened={isDrawerOpened}
        />
      )}
      <div className={styles.content}>
        <div className={styles.appbarSpace} />
        <div className={styles.mainContainer}>
          <_MainSwitch isLoggedIn={isUserLoggedIn} />
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
