import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

import SimplePaper from "../atoms/SimplePaper";
import { Company } from "../../hooks/useStock";
import CompaniesTableRow from "../molecules/CompaniesTableRow";

const CompaniesTable = ({ companies }: { companies: Company[] }) => {
  return (
    <SimplePaper
      topbar={
        <Typography variant="h4" color="textPrimary">
          Stock
        </Typography>
      }
    >
      <Typography component="h1" variant="h5" color="textPrimary">
        <Grid>
          {companies?.map((company) => (
            <CompaniesTableRow key={company.id} company={company} />
          ))}
        </Grid>
      </Typography>
    </SimplePaper>
  );
};

export default CompaniesTable;
