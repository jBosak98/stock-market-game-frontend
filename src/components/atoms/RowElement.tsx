import React from "react";
import { makeStyles, Grid, Theme } from "@material-ui/core";
import { Link } from "react-router-dom";

import ConditionalWrapper from "./ConditionalWrapper";
import { Sm } from "../../lib/types";

type RowElementProps = {
  children: React.ReactNode;
  className?: string;
  optional?: boolean;
  link?: string | undefined;
  sm?: Sm;
  md?: Sm;
  color?: string;
};

const useElementStyles = makeStyles<Theme, RowElementProps>((theme) => ({
  element: {
    fontSize: "15px",
    marginTop: "auto",
    marginBottom: "auto",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
    color: (props) => props.color,
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

const RowElement = (props: RowElementProps) => {
  const { children, className, optional = false, link, sm, color, md } = props;
  const styles = useElementStyles(props);
  return (
    <Grid
      className={`${className} ${styles.element} ${(optional &&
        styles.optional) ||
        ""}`}
      sm={sm || 4}
      md={md || 2}
      item
      color={color}
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
