import type {Candles} from './getCandlesQuery';
import { Transactions } from "./getTransactionsQuery";


const mapChartData = (
  data: { getCandles: Candles },
  transactionsData: Transactions | undefined
) =>
  data?.getCandles?.map(
    ({ openPrice, highPrice, lowPrice, closePrice, volume, time }, index) => {
      const transactions =
        transactionsData?.getTransactions.filter((t) => {
          const nextPointDate = data?.getCandles[index + 1]?.time
            ? new Date(data?.getCandles[index + 1]?.time)
            : new Date();
          return (
            new Date(t.createdAt) > new Date(time) &&
            new Date(t.createdAt) < nextPointDate
          );
        }) || [];
      const disposals = transactions
        .filter(({ type }) => type === "DISPOSAL")
        .reduce(
          (quantity, transactions) => quantity + transactions.quantity,
          0
        );
      const purchases = transactions
        .filter(({ type }) => type === "PURCHASE")
        .reduce(
          (quantity, transactions) => quantity + transactions.quantity,
          0
        );
      return {
        open: openPrice,
        high: highPrice,
        low: lowPrice,
        close: closePrice,
        volume,
        split: "",
        dividend: "",
        absoluteChange: "",
        percentChange: "",
        date: new Date(time),
        purchases,
        disposals,
        transactions,
      };
    }
  ) || [];


  export default mapChartData;