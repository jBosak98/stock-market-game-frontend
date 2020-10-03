import React from "react";
import { Grid, Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import SimplePaper from "../atoms/SimplePaper";

const useStyles = makeStyles(() => ({
  transactionButton: {
    marginRight: "auto",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));
type CompanyDetailsHeaderProps = {
  ticker: string;
};

const CompanyDetailsHeader = ({ ticker }: CompanyDetailsHeaderProps) => {
  const styles = useStyles();
  return (
    <SimplePaper topbar={<>{ticker}</>}>
      <Grid container direction="column">
        miejsce na chart
        <Link className={styles.link} to={`/company/${ticker}/transaction`}>
          <Button
            className={styles.transactionButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            MAKE A TRANSACTION
          </Button>
        </Link>
      </Grid>
    </SimplePaper>
  );
};
export default CompanyDetailsHeader;
