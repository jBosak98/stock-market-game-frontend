import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useQuery } from "urql";

import CompaniesTableHeader from "../molecules/CompaniesTableHeader";
import { User } from "../../lib/types";
import { meQuery } from "../../hooks/useUser";
import ContentContainer from "../atoms/ContentContainer";
import SimplePaper from "../atoms/SimplePaper";
import CompaniesTableRow from "../molecules/CompaniesTableRow";
import PortfolioTopbar from "../atoms/PortfolioTopbar";
import Loader from "../atoms/Loader";
import useUser from "../../hooks/useUser";

function PortfolioSection() {
  const user = useUser((store) => store.user);
  const headerRows = [
    { text: "SYMBOL", optional: true },
    { text: "NAME", optional: false },
    { text: "SHARES", optional: false },
    { text: "CHANGE", optional: false },
    { text: "CHANGE PERCENTAGE", optional: true },
    { text: "LAST PRICE", optional: false },
  ];
  const { shares = [], money = 0 } = user?.assets || {};

  if (!user) return <Loader />;

  return (
    <ContentContainer>
      <SimplePaper topbar={<PortfolioTopbar money={money} />}>
        <Grid>
          {(!shares.length && <NoSharesInfo />) || (
            <>
              <CompaniesTableHeader sm={3} rows={headerRows} />
              {shares.map(({ amount, companyId, company }) => {
                const { name, ticker, quote } = company;
                const { currentPrice, dailyChange } = quote;
                const rows = [
                  {
                    text: ticker,
                    optional: true,
                    link: `/company/${ticker}`,
                  },
                  { text: name, optional: false, link: `/company/${ticker}` },
                  { text: amount, optional: false },
                  { text: dailyChange, optional: false },
                  { text: 0.0, optional: true },
                  { text: currentPrice, optional: false },
                ];
                return <CompaniesTableRow sm={3} key={companyId} rows={rows} />;
              })}
            </>
          )}
        </Grid>
      </SimplePaper>
    </ContentContainer>
  );
}

const NoSharesInfo = () => <Typography>You have no shares</Typography>;

export default PortfolioSection;
