import { useQuery } from "urql";
import { Company, Quote } from "../lib/types";

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
          dailyChangePercentage
          currentPrice 
        }
      }
    }
  }
`;

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
    requestPolicy: "cache-and-network",
  });
  const { data, error, fetching } = result;
  return { data, error, fetching };
};

export default useStock;
