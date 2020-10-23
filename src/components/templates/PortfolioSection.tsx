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
import mapData from "../../lib/mapData";

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
  const { shares = [], money = 0, accountValue = 0 } = user?.assets || {};

  if (!user) return <Loader />;

  return (
    <ContentContainer>
      <SimplePaper
        topbar={<PortfolioTopbar money={money} accountValue={accountValue} />}
      >
        <Grid>
          {(!shares.length && <NoSharesInfo />) || (
            <>
              <CompaniesTableHeader sm={3} rows={headerRows} />
              {shares.map(({ amount, companyId, company }) => {
                const { name, ticker, quote } = company;
                const {
                  currentPrice,
                  dailyChange,
                  dailyChangePercentage,
                } = quote;
                const rows = [
                  {
                    text: ticker,
                    optional: true,
                    link: `/company/${ticker}`,
                  },
                  { text: name, optional: false, link: `/company/${ticker}` },
                  { text: amount, optional: false },
                  {
                    text: mapData(["dailyChange", dailyChange])[0][1],
                    optional: false,
                    color: dailyChange > 0 ? "green" : "red",
                  },
                  {
                    text: mapData([
                      "dailyChangePercentage",
                      dailyChangePercentage,
                    ])[0][1],
                    optional: true,
                    color: dailyChangePercentage > 0 ? "green" : "red",
                  },
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
