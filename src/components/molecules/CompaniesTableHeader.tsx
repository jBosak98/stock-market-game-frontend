import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Grid } from "@material-ui/core";

import { Sm } from "../../lib/types";
import RowElement from "../atoms/RowElement";

const useStyles = makeStyles((theme) => ({
  header: {
    borderBottom: `1px ${theme.palette.grey["50"]} solid`,
    marginBottom: "0px",
  },
  element: {
    marginBottom: "0px",
  },
}));

type CompaniesTableHeaderProps = {
  rows: { text: string; optional: boolean }[];
  sm?: Sm;
};

const CompaniesTableHeader = ({ rows, sm }: CompaniesTableHeaderProps) => {
  const styles = useStyles();
  return (
    <>
      <Grid
        className={styles.header}
        spacing={3}
        alignContent="space-around"
        container
        direction="row"
      >
        {rows.map(({ text, optional }) => (
          <HeaderRowElement
            key={text}
            className={styles.element}
            optional={optional}
            sm={sm || "auto"}
          >
            {text}
          </HeaderRowElement>
        ))}
      </Grid>
    </>
  );
};

type HeaderRowElementProps = {
  children: React.ReactNode;
  className?: string;
  optional?: boolean;
  sm?: Sm;
};
const HeaderRowElement = ({
  optional,
  children,
  className,
  sm,
}: HeaderRowElementProps) => (
  <RowElement sm={sm} className={className} optional={optional}>
    <Typography variant="subtitle1" color="primary">
      {children}
    </Typography>
  </RowElement>
);

export default CompaniesTableHeader;
