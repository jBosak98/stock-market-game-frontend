import React from "react";
import { Switch, Redirect } from "react-router-dom";

import RankingSection from "../components/RankingSection";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";
import StockSection from "../components/StockSection";
import PublicRoute from "./PublicRoute";
import Portfolio from "../components/PortfolioSection";
import TransactionsHistorySection from "../components/TransactionsHistorySection";
import Settings from "../components/Settings";

function MainRoute() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Portfolio} />
      <PrivateRoute exact path="/ranking" component={RankingSection} />
      <PrivateRoute exact path="/stock" component={StockSection} />
      <PrivateRoute exact path="/history" component={TransactionsHistorySection} />
      <PrivateRoute exact path="/settings" component={Settings} />
      <PublicRoute path="/auth" component={AuthRoute} />
      <Redirect to="/" />
    </Switch>
  );
}

export default MainRoute;
