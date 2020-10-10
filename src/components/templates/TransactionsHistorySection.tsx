import React from "react";
import { useQuery } from "urql";
import { Grid, Typography } from "@material-ui/core";

import ContentContainer from "../atoms/ContentContainer";
import getTransactionsQuery, {
  Transactions,
} from "../../lib/getTransactionsQuery";
import Loader from "../atoms/Loader";
import SimplePaper from "../atoms/SimplePaper";
import CompaniesTableHeader from "../molecules/CompaniesTableHeader";
import CompaniesTableRow from "../molecules/CompaniesTableRow";

function TransactionsHistorySection() {
  const [{ data, error, fetching }] = useQuery<Transactions>({
    query: getTransactionsQuery,
  });
  if (fetching) {
    return <Loader />;
  }
  const headerRows = [
    { text: "SYMBOL", optional: false },
    { text: "SHARES", optional: false },
    { text: "PRICE PER SHARE", optional: false },
    { text: "DATE", optional: false },
    { text: "SUBTOTAL", optional: false },
  ];
  console.log(data);
  const transactions = data?.getTransactions || [];
  return (
    <ContentContainer>
      <SimplePaper
        topbar={
          <Typography variant="h4" color="textPrimary">
            Transactions History
          </Typography>
        }
      >
        <Grid>
          <CompaniesTableHeader sm={3} rows={headerRows} />
          {transactions.map(
            ({ id, company, pricePerShare, createdAt, quantity }) => {
              const { ticker } = company;

              const rows = [
                {
                  text: ticker,
                  optional: false,
                  link: `/company/${ticker}`,
                },
                { text: quantity, optional: false },
                { text: pricePerShare, optional: false },
                { text: createdAt, optional: false },
                { text: pricePerShare * quantity, optional: true },
              ];
              return <CompaniesTableRow sm={3} key={id} rows={rows} />;
            }
          )}
        </Grid>
      </SimplePaper>
    </ContentContainer>
  );
}

export default TransactionsHistorySection;
