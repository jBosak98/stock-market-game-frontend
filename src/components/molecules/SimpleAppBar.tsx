import AppBar from "@material-ui/core/AppBar";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import { Toolbar, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import "./SimpleAppBar.scss";
import { useAlertContext } from "../../contexts/AlertContext";
import { useThemeMode } from "../../contexts/ThemeModeContext";
import AlertsContainer from "../atoms/AlertsContainer";

const useStyles = makeStyles((theme) => ({
  typography: {
    flexGrow: 1,
  },
  appBar: {
    width: "inherit",
  },
  alertContainer: {
    position: "absolute",
    right: "50px",
    top: "80px",
  },
  alert: {
    margin: "5px",
  },
}));

const SimpleAppBar = ({
  isDrawerOpened,
  setIsDrawerOpened = () => {},
}: {
  isDrawerOpened: boolean;
  setIsDrawerOpened: (drawState: boolean) => unknown;
}) => {
  const { alerts, addAlert } = useAlertContext();
  const classes = useStyles();

  const { darkMode, setDarkMode } = useThemeMode();

  const onThemeModeChange = useCallback(() => {
    setDarkMode(!darkMode);
    addAlert({
      serverity: "info",
      message: `Changed to ${darkMode ? "light mode" : "dark mode"}`,
    });
  }, [darkMode]);
  return (
    <div className={classnames("SimpleAppBar", { isOpen: isDrawerOpened })}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="default"
            aria-label="open drawer"
            onClick={() => setIsDrawerOpened(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="textSecondary"
            noWrap
            className={classes.typography}
          >
            Stock Market Game
          </Typography>

          <AlertsContainer alerts={alerts} />
          <IconButton onClick={onThemeModeChange}>
            <Brightness4Icon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default SimpleAppBar;
