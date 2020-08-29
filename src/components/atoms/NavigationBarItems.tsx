import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import HistoryIcon from '@material-ui/icons/History';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Link as NavLink } from 'react-router-dom';
import logoutAction from '../actions/logoutAction';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import './NavigationBarItems.scss';

const NavigationBarItems = () => {
  const [selectedItem, setSelectedItem] = useState(document.location.pathname);

  return (
    <div className="NavigationBarItems">
      <_MenuItem selectedItem={selectedItem} onClick={setSelectedItem} to="/" label="Portfolio">
        <AccountBalanceWalletIcon />
      </_MenuItem>

      <_MenuItem
        selectedItem={selectedItem}
        onClick={setSelectedItem}
        to="/history"
        label="Transactions history"
      >
        <HistoryIcon />
      </_MenuItem>

      <_MenuItem selectedItem={selectedItem} onClick={setSelectedItem} to="/stock" label="Stock">
        <AttachMoneyIcon />
      </_MenuItem>

      <_MenuItem
        selectedItem={selectedItem}
        onClick={setSelectedItem}
        to="/ranking"
        label="Ranking"
      >
        <DashboardIcon />
      </_MenuItem>

      <_MenuItem
        selectedItem={selectedItem}
        onClick={setSelectedItem}
        to="/settings"
        label="Settings"
      >
        <SettingsIcon />
      </_MenuItem>
      <div className="navbar-space" />
      <div className="bottom-items">
        <_MenuItem selectedItem={''} onClick={logoutAction} to="/" label="Logout">
          <ExitToAppIcon />
        </_MenuItem>
      </div>
    </div>
  );
};

type MenuItemType = {
  to: string;
  label: string;
  children: any;
  selectedItem: string;
  onClick: (to: string) => any;
};

const _MenuItem = ({ to, label, selectedItem, onClick, children }: MenuItemType) => {
  const selected = selectedItem === to;
  return (
    <NavLink to={to}>
      <ListItem selected={selected} button onClick={() => onClick(to)}>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
    </NavLink>
  );
};

export default NavigationBarItems;
