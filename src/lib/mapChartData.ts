
import type {Candles} from './getCandlesQuery';
import { Transaction } from "./getTransactionsQuery";


const mapChartData = (
  data: Candles,
  transactionsData: Transaction[],
  showTransactions: boolean
) =>{
 const candles = data?.map(
    ({ openPrice, highPrice, lowPrice, closePrice, volume, time, predicted }, index) => {
      const transactions =
      transactionsData
        .filter((transaction) => {
          const nextPointDate = data[index + 1]?.time
            ? new Date(data[index + 1]?.time)
            : new Date();
          return (
            new Date(transaction.createdAt) > new Date(time) &&
            new Date(transaction.createdAt) < nextPointDate
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
        predicted:!!predicted
      };
    }
  ) || [];
  
  
  const limitRangeToFirstTransaction = () => {
    const margin = 3;
    const firstTransactionIndex = candles
    .sort((first,second)=>first.date.getTime() - second.date.getTime())
    .findIndex((candle)=>candle.transactions.length);
    return candles.slice(firstTransactionIndex - margin || 0, candles.length);
  }

  return showTransactions ? limitRangeToFirstTransaction() : candles;
}

  export default mapChartData;