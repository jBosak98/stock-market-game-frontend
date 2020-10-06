import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { isUndefined } from "lodash";

import RowElement from "../atoms/RowElement";

const useStyles = makeStyles((theme) => ({
  row: {
    borderBottom: `1px ${theme.palette.grey["100"]} solid`,
    margin: "0px",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));
type CompaniesTableRowProps = {
  sm?:
    | boolean
    | "auto"
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | undefined;
  rows: {
    text?: String | Number;
    optional: boolean;
    link?: string;
    component?: JSX.Element;
  }[];
};
const CompaniesTableRow = ({ rows, sm }: CompaniesTableRowProps) => {
  const styles = useStyles();

  return (
    <Grid
      className={styles.row}
      spacing={3}
      alignContent="space-around"
      container
      direction="row"
    >
      {rows.map(({ text, optional, component, link }, index) => (
        <RowElement sm={sm} link={link} optional={optional} key={index}>
          {isUndefined(text) ? component : text}
        </RowElement>
      ))}
    </Grid>
  );
};

export default CompaniesTableRow;
