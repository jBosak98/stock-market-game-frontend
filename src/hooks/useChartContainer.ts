import React, { useState } from "react";
import { useQuery } from "urql";
import moment from 'moment';
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { scaleTime } from "d3-scale";
import { last } from "react-stockcharts/lib/utils";



import useUser from "./useUser";
import getCandlesQuery from '../lib/getCandlesQuery';
import type { Candles } from '../lib/getCandlesQuery';
import type { ChartResolutionType } from '../lib/types';
import getTransactionsQuery, {
  Transactions,
} from "../lib/getTransactionsQuery";
import mapChartData from "../lib/mapChartData";

function addMinutes(date: any, minutes: number) {
  return new Date((new Date(date)).getTime() + minutes * 60000);
}

const useChartContainer = (ticker: string) => {
  const [resolution, setResolution] = useState<ChartResolutionType>("15");
  const [showTransactions, setShowTransactions] = useState<boolean>(false);
  const from = moment()
    .startOf("minute")
    .subtract(1, "year")
    .toDate()
    .toJSON();
  const to = moment()
    .startOf("minute")
    .toDate()
    .toJSON();
  const [{ data: rawData, fetching, error }] = useQuery<{ getCandles: Candles }>({
    query: getCandlesQuery,
    requestPolicy: 'cache-and-network',
    variables: {
      ticker,
      from,
      to,
      resolution,
    },
  });
  const a = rawData?.getCandles?.length ? console.log(rawData): '';
  const predicted = rawData?.getCandles?.length
    ? [...Array(30)].reduce((acc, curr, index) => [...acc, {
      ...acc[index], 
      time: addMinutes(acc[index]?.time, 15),
      closePrice: (acc[index]?.closePrice * (1 + ((Math.random()-0.5)/100))),
      predicted:true
    }], [
      { ...(rawData?.getCandles[rawData?.getCandles.length - 1]),
        closePrice: rawData!.getCandles[rawData!.getCandles.length - 1]?.closePrice,
        time: addMinutes(rawData?.getCandles[rawData?.getCandles.length - 1]?.time, 5),
        predicted:true
      }
    ]) : [];
  const [{ data: transactionsData }] = useQuery<Transactions>({
    query: getTransactionsQuery,
  });
  const user = useUser((store) => store.user);

  const isResolutionInMinutes =
    resolution === "1" ||
    resolution === "5" ||
    resolution === "15" ||
    resolution === "30";
  const dateFormat = isResolutionInMinutes ? "%m-%d %H:%M" : "%Y-%m-%d";
  const companyTransactions = transactionsData?.getTransactions.filter(({ company }) => company.ticker === ticker) || [];
  const dataWithTransactions = (rawData && mapChartData([...rawData.getCandles, ...predicted], companyTransactions, showTransactions)) || [];


  const xScaleProvider: any = discontinuousTimeScaleProvider.inputDateAccessor(
    (d: any) => d.date
  );
  const xScaleProviderData = xScaleProvider(
    dataWithTransactions
  );
  const { data, displayXAccessor } = xScaleProviderData;
  const xScale = isResolutionInMinutes ? xScaleProviderData.xScale : scaleTime()
  const xAccessor = isResolutionInMinutes ? xScaleProviderData.xAccessor : (d: any) => d && d.date || new Date();
  const elementsWidth = 2;
  const xExtents = [xAccessor(last(data)), xAccessor(data[elementsWidth])];
  return {
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
    companyTransactions,
    displayXAccessor
  };
};

export default useChartContainer;
