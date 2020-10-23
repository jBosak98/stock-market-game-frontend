import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

import mapData from "../../lib/mapData";

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
  return (
    <Grid component="div" container direction="row" justify="space-between">
      <Typography variant="h4" color="textSecondary">
        Portfolio
      </Typography>
      <Grid className={styles.item} item direction="column">
        {[
          ["money", money],
          ["accountValue", accountValue],
        ].map((data) => (
          <Grid
            key={data[0]}
            className={styles.flex}
            xs={12}
            item
            direction="row"
          >
            {mapData(data)[0].map((singleValue) => (
              <Grid
                item
                direction={"column"}
                xs={6}
                key={singleValue.toString()}
              >
                <Typography align="right" color="textSecondary">
                  {singleValue}
                </Typography>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default PortfolioTopbar;
