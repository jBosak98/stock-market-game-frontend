const sellShareMutation = `
    mutation sellShare($amount:Int!, $ticker:String!) {
        sellShare(amount: $amount, ticker: $ticker) {
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
export default sellShareMutation;
