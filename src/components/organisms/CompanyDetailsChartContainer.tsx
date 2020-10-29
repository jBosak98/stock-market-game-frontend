import React from "react";
import { Grid } from "@material-ui/core";

import SimplePaper from "../atoms/SimplePaper";

import Loader from "../atoms/Loader";
import ScrollDisableWrapper from "../atoms/ScrollDisableWrapper";
import ChartFooter from "../molecules/ChartFooter";
import Topbar from "../atoms/CompanyDetailsChartContainerTopbar";
import useChartContainer from "../../hooks/useChartContainer";
import CandlesChart from "../molecules/CandlesChart";
import mapChartData from "../../lib/mapChartData";

type CompanyDetailsChartContainerProps = {
  ticker: string;
};

const CompanyDetailsChartContainer = ({
  ticker,
}: CompanyDetailsChartContainerProps) => {
  const {
    resolution,
    setResolution,
    showTransactions,
    setShowTransactions,
    data,
    fetching,
    transactionsData,
    user,
    isResolutionInMinutes,
    dateFormat,
  } = useChartContainer(ticker);

  const ownedShares =
    user?.assets.shares.find((share) => share.company.ticker === ticker)
      ?.amount || 0;
  const chartData = (data && mapChartData(data, transactionsData)) || [];

  return (
    <ScrollDisableWrapper>
      <SimplePaper
        topbar={<Topbar ticker={ticker} ownedShares={ownedShares} />}
      >
        {fetching ? (
          <Loader />
        ) : (
          <Grid container direction="column">
            <CandlesChart
              showTransactions={showTransactions}
              lineSeries={isResolutionInMinutes}
              candleSeries={!isResolutionInMinutes}
              type={"svg"}
              data={chartData}
              dateFormat={dateFormat}
            />
            <ChartFooter
              showTransactions={showTransactions}
              setShowTransactions={setShowTransactions}
              resolution={resolution}
              setResolution={setResolution}
              ticker={ticker}
            />
          </Grid>
        )}
      </SimplePaper>
    </ScrollDisableWrapper>
  );
};

export default CompanyDetailsChartContainer;
