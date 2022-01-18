const getCandlesQuery = `
query getCandlesQuery($ticker:String!, $from:String!, $to:String!, $resolution:String!) {
  getCandles(ticker:$ticker, from:$from, to:$to, resolution:$resolution){
    openPrice
    highPrice
    lowPrice
    closePrice
    volume
    time
  }
}
`;


type Candles = Candle[];

type Candle = {
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
  volume: number;
  time: string;
  predicted?: boolean;
};

export default getCandlesQuery;
export type { Candle, Candles }