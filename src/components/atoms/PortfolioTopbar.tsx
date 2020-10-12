import React from "react";
import Typography from "@material-ui/core/Typography";

import mapData from "../../lib/mapData";

type PortfolioTopbarProps = { money: number };

const PortfolioTopbar = ({ money }: PortfolioTopbarProps) => {
  return (
    <>
      <Typography variant="h4" color="textSecondary">
        Portfolio
      </Typography>
      <Typography color="textSecondary">{mapData(["money", money])}</Typography>
    </>
  );
};

export default PortfolioTopbar;
