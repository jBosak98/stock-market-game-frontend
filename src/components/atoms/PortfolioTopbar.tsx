import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

import PortfolioTopBarKeyValue from "./PortfolioTopbarKeyValue";

type PortfolioTopbarProps = { money: number; accountValue: number };

const useStyles = makeStyles(() => ({
  item: {
    width: "50%",
    maxWidth: "230px",
    display: "flex",
  },
  flex: {
    display: "flex",
  },
}));

const PortfolioTopbar = ({ money, accountValue }: PortfolioTopbarProps) => {
  const styles = useStyles();
  const moneyToStart = 100000;
  return (
    <Grid component="div" container direction="row" justify="space-between">
      <Typography variant="h4" color="textSecondary">
        Portfolio
      </Typography>
      <Grid className={styles.item} item direction="column">
        <PortfolioTopBarKeyValue
          classname={styles.flex}
          data={["money", money]}
          tooltip={"Total amount of cash available for trading stocks with"}
        />
        <PortfolioTopBarKeyValue
          classname={styles.flex}
          tooltip={"Sum of free cash and stock values"}
          data={["accountValue", accountValue]}
        />
        <PortfolioTopBarKeyValue
          tooltip={"Money earned since the start the game"}
          classname={styles.flex}
          data={["totalIncome", accountValue - moneyToStart]}
        />
      </Grid>
    </Grid>
  );
};

export default PortfolioTopbar;
