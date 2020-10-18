import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";

import SimpleAppBar from "./SimpleAppBar";
import SimpleDrawer from "../atoms/SimpleDrawer";
import MainRoute from "../../routes/MainRoute";
import useSubscribedUser from "../../hooks/useSubscribedUser";

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
    overflow: "auto",
    width: "100%",
    backgroundColor: theme.palette.background.default,
  },
}));

const ApplicationLayout = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);
  const [_, isUserLoggedIn] = useSubscribedUser();
  const styles = useStyles();
  return (
    <BrowserRouter>
      <SimpleAppBar
        isDrawerOpened={!!isUserLoggedIn && isDrawerOpened}
        setIsDrawerOpened={setIsDrawerOpened}
      />
      {!!isUserLoggedIn && (
        <SimpleDrawer
          setIsDrawerOpened={setIsDrawerOpened}
          isDrawerOpened={isDrawerOpened}
        />
      )}
      <div className={styles.content}>
        <div className={styles.appbarSpace} />
        <div className={styles.mainContainer}>
          <MainRoute />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default ApplicationLayout;
