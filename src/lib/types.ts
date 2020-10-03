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
