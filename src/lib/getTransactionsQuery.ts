const getTransactionsQuery = `
    query getTransactionsQuery {
        getTransactions {
            id
            company {
              ticker
              id
              name
            }
            pricePerShare
            quantity
            createdAt
            type
          }
      }
  
`;

export type Transactions = {
  getTransactions: Transaction[];
};

export type Transaction = {
  id: number;
  createdAt: string;
  quantity: number;
  type: "PURCHASE" | "DISPOSAL";
  pricePerShare: number;
  company: {
    id: number;
    name: string;
    ticker: string;
  };
};

export default getTransactionsQuery;
