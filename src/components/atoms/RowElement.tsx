import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import ConditionalWrapper from "./ConditionalWrapper";

type RowElementProps = {
  children: React.ReactNode;
  className?: string;
  optional?: boolean;
  link?: string | undefined;
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
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const RowElement = ({
  children,
  className,
  optional = false,
  link,
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
      <ConditionalWrapper
        condition={!!link}
        wrapper={(children: React.ReactNode) => (
          <Link className={styles.link} to={link || "/"}>
            {children}
          </Link>
        )}
      >
        {children}
      </ConditionalWrapper>
    </Grid>
  );
};

export default RowElement;
