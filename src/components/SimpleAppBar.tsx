import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import { Toolbar, IconButton } from "@material-ui/core";

import "./SimpleAppBar.scss";

const SimpleAppBar = ({
  isDrawerOpened,
  setIsDrawerOpened
}: {
  isDrawerOpened: boolean;
  setIsDrawerOpened: (drawState: boolean) => any;
}) => (
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
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

export default SimpleAppBar;
