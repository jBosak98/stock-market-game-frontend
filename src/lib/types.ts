export type User = {
  email: string;
  id: number;
  token: string;
  assets: {
    money: number;
    accountValue: number;
    shares: {
      companyId: number;
      amount: number;
      company: Company;
      totalGain: number;
    }[];
  };
};
export type Quote = {
  companyId: Number;
  currentPrice: number;
  dailyChange: Number;
  dailyChangePercentage: Number;
};

export type Company = {
  id: number;
  name: String;
  ticker: String;
  quote: Quote;
};

export type CompaniesTableRowType = {
  md?: Sm;
  text?: String | Number;
  optional: boolean;
  link?: string;
  component?: JSX.Element;
  color?: string;
};

export type HeaderRowType = {
  text: string;
  optional: boolean;
  md?: Sm;
};

export type Sm =
  | boolean
  | "auto"
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | undefined;

export type ShareTransactionRequest = { amount: number; ticker: string };

export type ShareTransactionResult = { buyShare: User };

export type ChartResolutionType = "1" | "5" | "15" | "30" | "D" | "W" | "M";
