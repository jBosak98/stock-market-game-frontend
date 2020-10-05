export type User = {
  email: string;
  id: number;
  token: string;
  assets: {
    money: number;
    shares: {
      companyId: number;
      amount: number;
    }[];
  };
};

export type ShareTransactionRequest = { amount: number; ticker: string };

export type ShareTransactionResult = { buyShare: User };
