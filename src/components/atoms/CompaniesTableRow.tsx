import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

import { Company } from "../../hooks/useStock";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  optional: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const CompaniesTableRow = ({ company }: { company: Company }) => {
  const styles = useStyles();
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
      <RowElement className={styles.optional}>{ticker}</RowElement>
      <RowElement>{name}</RowElement>
      <RowElement>{dailyChange}</RowElement>
      <RowElement className={styles.optional}>{0.0}</RowElement>
      <RowElement>{currentPrice}</RowElement>
      <RowElement className={styles.optional}>
        <Button type="submit" fullWidth variant="contained" color="primary">
          TRANSACTION
        </Button>
      </RowElement>
    </Grid>
  );
};

type RowElementProps = {
  children: React.ReactNode;
  className?: string;
};

const useElementStyles = makeStyles((theme) => ({
  element: {
    fontSize: "15px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
}));

const RowElement = ({ children, className }: RowElementProps) => {
  const styles = useElementStyles();
  return (
    <Grid className={className || styles.element} xs={4} sm={4} md={2} item>
      {children}
    </Grid>
  );
};
export default CompaniesTableRow;
