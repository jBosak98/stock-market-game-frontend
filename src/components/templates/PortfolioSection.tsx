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
import type { Sm, CompaniesTableRowType, HeaderRowType } from "../../lib/types";




function PortfolioSection() {
  const user = useUser((store) => store.user);
  const headerRows: HeaderRowType[] = [
    { text: "SYMBOL", optional: true },
    { text: "NAME", optional: false },
    { text: "SHARES", optional: false, md: 1 },
    { text: "DAILY CHANGE", optional: false, md: 1 },
    { text: "DAILY CHANGE PERCENTAGE", optional: true },
    { text: "LAST PRICE", optional: false },
    { text: "TOTAL GAIN/LOSS", optional: true, md: 1 },
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
              {shares.map(({ amount, companyId, company, totalGain, totalGainPercentage }) => {
                const { name, ticker, quote } = company;
                const {
                  currentPrice,
                  dailyChange,
                  dailyChangePercentage,
                } = quote;
                const rows: CompaniesTableRowType[] = [
                  {
                    text: ticker,
                    optional: true,
                    link: `/company/${ticker}`,
                  },
                  { text: name, optional: false, link: `/company/${ticker}` },
                  { text: amount, optional: false, md: 1 },
                  {
                    text: mapData(["dailyChange", dailyChange])[0][1],
                    optional: false,
                    color: dailyChange > 0 ? "green" : "red",
                    md: 1,
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
                  {
                    text: mapData(["totalGain", {totalGainPercentage, totalGain}])[0][1],
                    optional: true,
                    md: 1,
                    color: totalGainPercentage > 0 ? "green" : "red",
                  },
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
