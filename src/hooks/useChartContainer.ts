import React, {useState} from "react";
import { useQuery } from "urql";
import moment from 'moment';
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { scaleTime } from "d3-scale";
import { last } from "react-stockcharts/lib/utils";



import useUser from "./useUser";
import getCandlesQuery from '../lib/getCandlesQuery';
import type {Candles} from '../lib/getCandlesQuery';
import type { ChartResolutionType } from '../lib/types';
import getTransactionsQuery, {
  Transactions,
} from "../lib/getTransactionsQuery";
import mapChartData from "../lib/mapChartData";



const useChartContainer = (ticker: string) => {
  const [resolution, setResolution] = useState<ChartResolutionType>("D");
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
  const [{ data:rawData, fetching, error }] = useQuery<{ getCandles: Candles }>({
    query: getCandlesQuery,
    requestPolicy:'cache-and-network',
    variables: {
      ticker,
      from,
      to,
      resolution,
    },
  });

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
  const companyTransactions = transactionsData?.getTransactions.filter(({company})=>company.ticker === ticker) || [];
  const dataWithTransactions = (rawData && mapChartData(rawData, companyTransactions, showTransactions)) || [];


  const xScaleProvider:any = discontinuousTimeScaleProvider.inputDateAccessor(
    (d:any) => d.date
  );
  const xScaleProviderData = xScaleProvider(
    dataWithTransactions
  );
    const {data, displayXAccessor} = xScaleProviderData;
    const xScale = isResolutionInMinutes ? xScaleProviderData.xScale : scaleTime()
    const xAccessor =  isResolutionInMinutes ? xScaleProviderData.xAccessor : (d:any) =>d && d.date || new Date();
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
