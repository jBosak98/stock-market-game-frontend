import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

type RowElementProps = {
  children: React.ReactNode;
  className?: string;
  optional?: boolean;
};

const useElementStyles = makeStyles((theme) => ({
  element: {
    fontSize: "15px",
    marginTop: "auto",
    marginBottom: "auto",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  optional: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const RowElement = ({
  children,
  className,
  optional = false,
}: RowElementProps) => {
  const styles = useElementStyles();
  return (
    <Grid
      className={`${className} ${styles.element} ${(optional &&
        styles.optional) ||
        ""}`}
      xs={4}
      sm={4}
      md={2}
      item
    >
      {children}
    </Grid>
  );
};

export default RowElement;
