export type User = {
  email: string;
  id: number;
  token: string;
  assets: {
    money: number;
    shares: {
      companyId: number;
      amount: number;
      company: Company[];
    }[];
  };
};
export type Quote = {
  companyId: Number;
  currentPrice: number;
  dailyChange: Number;
};

export type Company = {
  id: number;
  name: String;
  ticker: String;
  quote: Quote;
};
export type ShareTransactionRequest = { amount: number; ticker: string };

export type ShareTransactionResult = { buyShare: User };
