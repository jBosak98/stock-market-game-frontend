import React from "react";
import { Grid, Button, makeStyles } from "@material-ui/core";

import SimplePaper from "../atoms/SimplePaper";

const useStyles = makeStyles(() => ({
  transactionButton: {
    marginRight: "auto",
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
        <Button
          className={styles.transactionButton}
          type="submit"
          variant="contained"
          color="primary"
          href={`/company/${ticker}/transaction`}
        >
          MAKE A TRANSACTION
        </Button>
      </Grid>
    </SimplePaper>
  );
};
export default CompanyDetailsHeader;
