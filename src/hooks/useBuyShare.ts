import { useMutation } from "urql";

import { User } from "../lib/types";

const buyShareMutation = `
    mutation buyShare {
        buyShare(amount: 1, ticker: "AAPL") {
          id
          email
          token
          assets {
            money
            shares {
              companyId
              amount
            }
          }
        }
      }
  
`;

type ShareTransactionProps = { amount: number; ticker: string };

const useBuyShare = () => {
  const [buyShareResult, buyShare] = useMutation<
    { buyShare: User },
    ShareTransactionProps
  >(buyShareMutation);

  return { buyShare, buyShareResult };
};

export default useBuyShare;
