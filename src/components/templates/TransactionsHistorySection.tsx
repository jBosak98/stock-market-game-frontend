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
import { roundMoney } from "../../lib/mapData";

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
  const transactions = data?.getTransactions || [];
  return (
    <ContentContainer>
      <SimplePaper
        topbar={
          <Typography variant="h4" color="textSecondary">
            Transactions History
          </Typography>
        }
      >
        <Grid>
          {(!transactions.length && <NoHistoryInfo />) || (
            <>
              <CompaniesTableHeader sm={2} rows={headerRows} />
              {transactions.map(
                ({ id, company, pricePerShare, createdAt, quantity, type }) => {
                  const { ticker } = company;
                  const created = new Date(createdAt);
                  const sign = type === "DISPOSAL" ? "+ " : "- ";
                  const rows = [
                    {
                      text: ticker,
                      optional: false,
                      link: `/company/${ticker}`,
                    },
                    { text: quantity, optional: false },
                    { text: roundMoney(pricePerShare), optional: false },
                    { text: created.toLocaleString(), optional: false },
                    {
                      text: `${sign + roundMoney(pricePerShare * quantity)}$`,
                      optional: false,
                    },
                  ];
                  return <CompaniesTableRow sm={2} key={id} rows={rows} />;
                }
              )}
            </>
          )}
        </Grid>
      </SimplePaper>
    </ContentContainer>
  );
}

const NoHistoryInfo = () => <Typography>Your history is empty</Typography>;

export default TransactionsHistorySection;
