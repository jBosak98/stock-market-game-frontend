import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  keyValueRow: {
    minHeight: "50px",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    borderBottom: `1px ${theme.palette.grey["100"]} solid`,
    color: theme.palette.grey["200"],
  },
}));

type KeyValueRowProps = {
  key: string;
  value: string | number | undefined;
};
const KeyValueRow = ({ key, value }: KeyValueRowProps) => {
  const styles = useStyles();
  return (
    <Grid
      container
      item
      key={key}
      justify="space-between"
      direction="row"
      className={styles.keyValueRow}
    >
      <Grid sm={5} item>
        <Typography color="inherit" display="inline" variant="body1">
          {key}
        </Typography>
      </Grid>
      <Grid sm={5} item>
        <Typography color="inherit" display="inline" variant="body1">
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default KeyValueRow;
