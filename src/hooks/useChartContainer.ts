import React, {useState} from "react";
import { useQuery } from "urql";
import moment from 'moment';



import useUser from "./useUser";
import getCandlesQuery from '../lib/getCandlesQuery';
import type {Candles} from '../lib/getCandlesQuery';
import type { ChartResolutionType } from '../lib/types';
import getTransactionsQuery, {
  Transactions,
} from "../lib/getTransactionsQuery";


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
  const [{ data, fetching, error }] = useQuery<{ getCandles: Candles }>({
    query: getCandlesQuery,
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

  return {
    resolution,
    setResolution,
    showTransactions,
    setShowTransactions,
    data,
    fetching,
    transactionsData,
    user,
    isResolutionInMinutes,
    dateFormat
  };
};

export default useChartContainer;
