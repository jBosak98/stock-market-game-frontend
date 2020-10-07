import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { useQuery } from "urql";

import CompaniesTableHeader from "../molecules/CompaniesTableHeader";
import { User } from "../../lib/types";
import { meQuery } from "../../hooks/useUser";
import ContentContainer from "../atoms/ContentContainer";
import SimplePaper from "../atoms/SimplePaper";
import CompaniesTableRow from "../molecules/CompaniesTableRow";

function PortfolioSection() {
  const [{ data, fetching, error }] = useQuery<{ me: User }>({
    query: meQuery,
  });
  const user = data?.me;
  console.log(user);
  const headerRows = [
    { text: "SYMBOL", optional: true },
    { text: "NAME", optional: false },
    { text: "SHARES", optional: false },
    { text: "CHANGE", optional: false },
    { text: "CHANGE PERCENTAGE", optional: true },
    { text: "LAST PRICE", optional: false },
  ];
  const { shares = [] } = user?.assets || {};
  return (
    <ContentContainer>
      <SimplePaper
        topbar={
          <Typography variant="h4" color="textPrimary">
            Portfolio
          </Typography>
        }
      >
        <Grid>
          <CompaniesTableHeader sm={3} rows={headerRows} />
          {shares.map(({ amount, companyId, company }) => {
            const { name, ticker, quote } = company;
            const { currentPrice, dailyChange } = quote;
            const rows = [
              { text: ticker, optional: true, link: `/company/${ticker}` },
              { text: name, optional: false, link: `/company/${ticker}` },
              { text: amount, optional: false },
              { text: dailyChange, optional: false },
              { text: 0.0, optional: true },
              { text: currentPrice, optional: false },
            ];
            return <CompaniesTableRow sm={3} key={companyId} rows={rows} />;
          })}
        </Grid>
      </SimplePaper>
    </ContentContainer>
  );
}

export default PortfolioSection;
