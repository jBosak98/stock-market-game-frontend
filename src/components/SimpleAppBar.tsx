import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import { Toolbar, IconButton } from "@material-ui/core";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { useThemeMode } from '../contexts/ThemeModeContext';
import { makeStyles } from "@material-ui/core/styles";

import "./SimpleAppBar.scss";

const useStyles = makeStyles((theme) => ({
  typography: {
    flexGrow: 1
  }
}));

const SimpleAppBar = ({
  isDrawerOpened,
  setIsDrawerOpened,
}: {
  isDrawerOpened: boolean;
  setIsDrawerOpened: (drawState: boolean) => any;
}) => {
  const classes = useStyles();
  const {darkMode, setDarkMode } = useThemeMode();
  return (
  <div className={classnames("SimpleAppBar", { isOpen: isDrawerOpened })}>
    <AppBar>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => setIsDrawerOpened(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.typography}>
          E-gzamin
        </Typography>
        <IconButton  onClick={() => setDarkMode(!darkMode)}>
          <Brightness4Icon />
        </IconButton>
      </Toolbar>
    </AppBar>
  </div>
)}

export default SimpleAppBar;
