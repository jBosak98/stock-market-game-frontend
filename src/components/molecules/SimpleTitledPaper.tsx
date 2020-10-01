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
  paper: {
    minWidth: "500px",
  },
}));
type SimpleTitledPaperProps = {
  children?: React.ReactNode;
  title?: string;
};
const SimpleTitledPaper = ({ children, title }: SimpleTitledPaperProps) => {
  const styles = useStyles();
  return (
    <SimplePaper className={styles.paper}>
      <Typography className={styles.title} variant="body1" color="primary">
        {title || ""}
      </Typography>
      <Grid container direction="column">
        {children}
      </Grid>
    </SimplePaper>
  );
};

export default SimpleTitledPaper;
