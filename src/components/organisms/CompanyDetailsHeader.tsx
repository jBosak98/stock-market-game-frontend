import React from "react";
import { Grid, Button, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import SimplePaper from "../atoms/SimplePaper";
import { useUserContext } from "../../contexts/UserContext";
import mapData from "../../lib/mapData";

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
  const user = useUserContext()((store) => store.user);
  const ownedShares =
    user?.assets.shares.find((share) => share.company.ticker === ticker)
      ?.amount || undefined;
  const styles = useStyles();
  return (
    <SimplePaper
      topbar={
        <>
          <Typography variant="h4" color="textSecondary">
            {ticker}
          </Typography>
          <Typography color="textSecondary">
            {mapData(["ownedShares", ownedShares])}
          </Typography>
        </>
      }
    >
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
