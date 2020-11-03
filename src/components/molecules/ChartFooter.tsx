import React from "react";
import { Grid } from "@material-ui/core";

import type { ChartResolutionType } from '../../lib/types';
import TransactionButtonLink from '../atoms/TransactionButtonLink';
import ChartSettings from './ChartSettings';

type ChartFooterProps = {
    showTransactions: boolean;
    setShowTransactions: (prev:boolean) => any;
    resolution: ChartResolutionType;
    setResolution: (res:ChartResolutionType) => any;
    ticker:string;
    disableShowTransactions:boolean;
}

const ChartFooter = (props:ChartFooterProps) => {
  const {
    showTransactions,
    setShowTransactions, 
    resolution, 
    setResolution, 
    ticker, 
    disableShowTransactions
  } = props;

  return (
    <Grid container justify="space-between" direction="row">
      <TransactionButtonLink ticker={ticker} />
      <ChartSettings
        showTransactions={showTransactions}
        setShowTransactions={setShowTransactions}
        resolution={resolution}
        setResolution={setResolution}
        disableShowTransactions={disableShowTransactions}
      />
    </Grid>
  );
};

export default ChartFooter;
