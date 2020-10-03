import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import { Company } from "../../hooks/useStock";
import Button from "@material-ui/core/Button";
import RowElement from "../atoms/RowElement";

const useStyles = makeStyles((theme) => ({
  row: {
    borderBottom: `1px ${theme.palette.grey["100"]} solid`,
    margin: "0px",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
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
        <Link className={styles.link} to={`/company/${ticker}/transaction`}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            TRANSACTION
          </Button>
        </Link>
      </RowElement>
    </Grid>
  );
};

export default CompaniesTableRow;
