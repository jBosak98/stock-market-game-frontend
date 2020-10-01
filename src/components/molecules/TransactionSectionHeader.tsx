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
    <Typography variant="h5" color="textPrimary">
      {ticker}
    </Typography>
    <Typography variant="h6" color="textPrimary">
      {name}
    </Typography>
  </>
);

export default TransactionSectionHeader;
