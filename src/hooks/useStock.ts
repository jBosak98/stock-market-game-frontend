import { useQuery } from "urql";

const stockQuery = `
query getCompanies($skip: Int, $limit: Int) {
    companiesConnection(skip: $skip, limit: $limit) {
      totalCount
      companies {
        id
        name
        ticker
        quote {
          companyId
          dailyChange
          currentPrice 
        }
      }
    }
  }
`;

type Quote = {
  companyId: Number;
  currentPrice: Number;
  dailyChange: Number;
};

export type Company = {
  id: number;
  name: String;
  ticker: String;
  quote: Quote;
};

type StockQueryResult = {
  companiesConnection: {
    totalCount: Number;
    companies: Company[];
  };
};

const useStock = (skip: number = 0, limit: number = 10) => {
  const [result] = useQuery<StockQueryResult>({
    query: stockQuery,
    variables: { skip, limit },
  });

  const { data, error, fetching } = result;
  return { data, error, fetching };
};

export default useStock;
