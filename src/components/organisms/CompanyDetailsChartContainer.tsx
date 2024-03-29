import React from "react";
import { Grid } from "@material-ui/core";

import SimplePaper from "../atoms/SimplePaper";

import Loader from "../atoms/Loader";
import ChartFooter from "../molecules/ChartFooter";
import Topbar from "../atoms/CompanyDetailsChartContainerTopbar";
import useChartContainer from "../../hooks/useChartContainer";
import CandlesChart from "../molecules/CandlesChart";

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
    user,
    isResolutionInMinutes,
    dateFormat,
    xScale,
    xAccessor,
    xExtents,
    displayXAccessor,
    companyTransactions,
  } = useChartContainer(ticker);

  const ownedShares =
    user?.assets.shares.find((share) => share.company.ticker === ticker)
      ?.amount || 0;

  return (
    <SimplePaper topbar={<Topbar ticker={ticker} ownedShares={ownedShares} />}>
      {fetching ? (
        <Loader />
      ) : (
        <Grid container direction="column">
          {data.length !== 0 && <CandlesChart
            showTransactions={showTransactions}
            lineSeries={isResolutionInMinutes}
            candleSeries={!isResolutionInMinutes}
            type={"svg"}
            data={data}
            dateFormat={dateFormat}
            xScale={xScale}
            xExtents={xExtents}
            xAccessor={xAccessor}
            displayXAccessor={displayXAccessor}
          />}
          <ChartFooter
            showTransactions={showTransactions}
            setShowTransactions={setShowTransactions}
            resolution={resolution}
            disableShowTransactions={!companyTransactions.length}
            setResolution={setResolution}
            ticker={ticker}
          />
        </Grid>
      )}
    </SimplePaper>
  );
};

export default CompanyDetailsChartContainer;
