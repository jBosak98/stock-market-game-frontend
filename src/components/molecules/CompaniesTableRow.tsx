import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

import { Company } from "../../hooks/useStock";
import Button from "@material-ui/core/Button";
import RowElement from "../atoms/RowElement";

const CompaniesTableRow = ({ company }: { company: Company }) => {
  const { id, name, ticker, quote } = company;
  const { currentPrice, dailyChange } = quote;
  return (
    <Grid
      spacing={3}
      alignContent="space-around"
      container
      key={id}
      direction="row"
    >
      <RowElement optional>{ticker}</RowElement>
      <RowElement>{name}</RowElement>
      <RowElement>{dailyChange}</RowElement>
      <RowElement optional>{0.0}</RowElement>
      <RowElement>{currentPrice}</RowElement>
      <RowElement optional>
        <Button type="submit" fullWidth variant="contained" color="primary">
          TRANSACTION
        </Button>
      </RowElement>
    </Grid>
  );
};

export default CompaniesTableRow;
