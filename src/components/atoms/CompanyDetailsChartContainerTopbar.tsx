import React from "react";
import { Typography } from "@material-ui/core";

import mapData from "../../lib/mapData";

const CompanyDetailsChartContainerTopbar = ({
  ticker,
  ownedShares,
}: {
  ticker: string;
  ownedShares: number;
}) => (
  <>
    <Typography variant="h4" color="textSecondary">
      {ticker}
    </Typography>
    <Typography color="textSecondary">
      {mapData(["ownedShares", ownedShares])}
    </Typography>
  </>
);

export default CompanyDetailsChartContainerTopbar;
