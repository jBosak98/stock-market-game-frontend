import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, Button } from "@material-ui/core";

import SimplePaper from "../atoms/SimplePaper";
import { Company } from "../../lib/types";
import CompaniesTableRow from "../molecules/CompaniesTableRow";
import CompaniesTableHeader from "../molecules/CompaniesTableHeader";
import mapData from "../../lib/mapData";

type CompaniesTableProps = { companies: Company[] };

const CompaniesTable = ({ companies }: CompaniesTableProps) => {
  const headerRows = [
    { text: "SYMBOL", optional: true },
    { text: "NAME", optional: false },
    { text: "DAILY CHANGE", optional: false },
    { text: "CHANGE PERCENTAGE", optional: true },
    { text: "LAST PRICE", optional: false },
  ];
  return (
    <SimplePaper topbar={<CompaniesTableTopbar />}>
      <Grid>
        <CompaniesTableHeader rows={headerRows} />
        {companies?.map(({ id, name, ticker, quote }) => {
          const { currentPrice, dailyChange, dailyChangePercentage } = quote;
          const rows = [
            {
              text: mapData(["ticker", ticker])[0][1],
              optional: true,
              link: `/company/${ticker}`,
            },
            {
              text: mapData(["name", name])[0][1],
              optional: false,
              link: `/company/${ticker}`,
            },
            {
              text: mapData(["dailyChange", dailyChange])[0][1],
              optional: false,
            },
            {
              text: mapData([
                "dailyChangePercentage",
                dailyChangePercentage,
              ])[0][1],
              optional: true,
            },
            {
              text: mapData(["currentPrice", currentPrice])[0][1],
              optional: false,
            },
            {
              component: (
                <Button type="submit" variant="contained" color="primary">
                  TRANSACTION
                </Button>
              ),
              optional: true,
              link: `/company/${ticker}/transaction`,
            },
          ];
          return <CompaniesTableRow rows={rows} key={id} />;
        })}
      </Grid>
    </SimplePaper>
  );
};

const CompaniesTableTopbar = () => (
  <Typography variant="h4" color="textSecondary">
    Stock
  </Typography>
);

export default CompaniesTable;
