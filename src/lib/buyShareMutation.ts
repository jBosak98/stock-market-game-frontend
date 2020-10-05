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
export default buyShareMutation;
