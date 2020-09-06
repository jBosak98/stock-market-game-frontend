import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Grid } from "@material-ui/core";

import ContentContainer from "../atoms/ContentContainer";
import SimplePaper from "../atoms/SimplePaper";
import useStock, { Company } from "../../hooks/useStock";
import CompaniesTableRow from "../atoms/CompaniesTableRow";

const useStyles = makeStyles(() => ({}));

function StockSection() {
  const styles = useStyles();
  const { data, error, fetching } = useStock();
  return (
    <ContentContainer>
      <SimplePaper
        topbar={
          <Typography variant="h4" color="textPrimary">
            Stock
          </Typography>
        }
      >
        <Typography component="h1" variant="h5" color="textPrimary">
          <Grid>
            {data?.companiesConnection?.companies?.map((company) => (
              <CompaniesTableRow key={company.id} company={company} />
            ))}
          </Grid>
        </Typography>
      </SimplePaper>
    </ContentContainer>
  );
}

export default StockSection;
