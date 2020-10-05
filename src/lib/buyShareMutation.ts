const buyShareMutation = `
    mutation buyShare($amount:Int!, $ticker:String!) {
        buyShare(amount:$amount, ticker:$ticker) {
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
