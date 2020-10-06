import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

import SimplePaper from "../atoms/SimplePaper";
import { Company } from "../../lib/types";
import CompaniesTableRow from "../molecules/CompaniesTableRow";
import CompaniesTableHeader from "../molecules/CompaniesTableHeader";

type CompaniesTableProps = { companies: Company[] };

const CompaniesTable = ({ companies }: CompaniesTableProps) => {
  const rows = [
    { text: "SYMBOL", optional: true },
    { text: "NAME", optional: false },
    { text: "CHANGE", optional: false },
    { text: "CHANGE PERCENTAGE", optional: true },
    { text: "LAST PRICE", optional: false },
  ];
  return (
    <SimplePaper topbar={<CompaniesTableTopbar />}>
      <Grid>
        <CompaniesTableHeader rows={rows} />
        {companies?.map((company) => (
          <CompaniesTableRow key={company.id} company={company} />
        ))}
      </Grid>
    </SimplePaper>
  );
};

const CompaniesTableTopbar = () => (
  <Typography variant="h4" color="textPrimary">
    Stock
  </Typography>
);

export default CompaniesTable;
