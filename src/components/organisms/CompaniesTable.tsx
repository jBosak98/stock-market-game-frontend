import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

import SimplePaper from "../atoms/SimplePaper";
import { Company } from "../../hooks/useStock";
import CompaniesTableRow from "../molecules/CompaniesTableRow";
import CompaniesTableHeader from "../molecules/CompaniesTableHeader";

type CompaniesTableProps = { companies: Company[] };

const CompaniesTable = ({ companies }: CompaniesTableProps) => {
  return (
    <SimplePaper topbar={<CompaniesTableTopbar />}>
      <Grid>
        <CompaniesTableHeader />
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
