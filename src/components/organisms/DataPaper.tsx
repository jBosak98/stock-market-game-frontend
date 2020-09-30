import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";

import SimplePaper from "../atoms/SimplePaper";

const useStyles = makeStyles((theme) => ({
  title: {
    borderBottom: `1px ${theme.palette.grey["50"]} solid`,
    height: "50px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
  },
  dataPaper: {
    minWidth: "500px",
  },
  keyValueRow: {
    minHeight: "50px",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    borderBottom: `1px ${theme.palette.grey["100"]} solid`,
    color: theme.palette.grey["200"],
  },
}));

type DataPaperProps = {
  data: Object;
  title?: string;
};

const DataPaper = ({ data, title }: DataPaperProps) => {
  const styles = useStyles();
  return (
    <SimplePaper className={styles.dataPaper}>
      <Typography className={styles.title} variant="body1" color="primary">
        {title || ""}
      </Typography>
      <Grid container direction="column">
        {Object.entries(data).map(([key, value]) => (
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
        ))}
      </Grid>
    </SimplePaper>
  );
};

export default DataPaper;
