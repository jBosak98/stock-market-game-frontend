import { useQuery } from 'urql';

const stockQuery = `
query getCompanies($skip: Int, $limit: Int) {
    companiesConnection(skip: $skip, limit: $limit) {
      totalCount
      companies {
        id
        name,
        stockPrice {
            id
            lastPrice
        }
      }
    }
  }
`;

type StockQueryResult = {
  companiesConnection: {
    totalCount: Number;
    companies: {
      id: Number;
      name: String;
      stockPrice: {
        id: Number;
        lastPrice: Number;
      };
    };
  };
};

const useStock = (skip: number = 0, limit: number = 10) => {
  const [result] = useQuery<StockQueryResult>({
    query: stockQuery,
    variables: { skip, limit },
  });

  const { data, error, fetching } = result;
  console.log(result);
  return { data, error, fetching };
};

export default useStock;
