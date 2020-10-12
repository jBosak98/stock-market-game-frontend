import React from "react";
import { Typography } from "@material-ui/core";

type TransactionSectionHeaderProps = {
  ticker: string;
  name?: string;
};
const TransactionSectionHeader = ({
  ticker,
  name,
}: TransactionSectionHeaderProps) => (
  <>
    <Typography variant="h5" color="textSecondary">
      {ticker}
    </Typography>
    <Typography variant="h6" color="textSecondary">
      {name}
    </Typography>
  </>
);

export default TransactionSectionHeader;
