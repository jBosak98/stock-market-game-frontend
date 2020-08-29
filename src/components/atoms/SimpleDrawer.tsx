import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import NavigationBarItems from "./NavigationBarItems";
import React from "react";
import classnames from "classnames";
import { IconButton } from "@material-ui/core";

import "./SimpleDrawer.scss";

const SimpleDrawer = ({
  isDrawerOpened,
  setIsDrawerOpened
}: {
  isDrawerOpened: boolean;
  setIsDrawerOpened: (drawState: boolean) => any;
}) => (
  <Drawer
    className={classnames({
      SimpleDrawer: true,
      isOpen: isDrawerOpened
    })}
    variant="permanent"
    open={isDrawerOpened}
  >
    <IconButton onClick={() => setIsDrawerOpened(false)}>
      <ChevronLeftIcon />
    </IconButton>
    <Divider />
    <List>
      <NavigationBarItems />
    </List>
  </Drawer>
);

export default SimpleDrawer;
