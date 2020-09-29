import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

import { Company } from "../../hooks/useStock";
import Button from "@material-ui/core/Button";
import RowElement from "../atoms/RowElement";

const useStyles = makeStyles((theme) => ({
  row: {
    borderBottom: `1px ${theme.palette.grey["100"]} solid`,
    margin: "0px",
  },
}));

const CompaniesTableRow = ({ company }: { company: Company }) => {
  const styles = useStyles();
  const { id, name, ticker, quote } = company;
  const { currentPrice, dailyChange } = quote;

  return (
    <Grid
      className={styles.row}
      spacing={3}
      alignContent="space-around"
      container
      key={id}
      direction="row"
    >
      <RowElement link={`/company/${ticker}`} optional>
        {ticker}
      </RowElement>
      <RowElement link={`/company/${ticker}`}>{name}</RowElement>
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
