import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Grid } from "@material-ui/core";

import { Sm, HeaderRowType } from "../../lib/types";
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
  rows: HeaderRowType[];
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
        {rows.map(({ text, optional, md = 2 }) => (
          <HeaderRowElement
            key={text}
            className={styles.element}
            optional={optional}
            sm={sm || "auto"}
            md={md || "auto"}
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
  md?: Sm;
};
const HeaderRowElement = ({
  optional,
  children,
  className,
  sm,
  md,
}: HeaderRowElementProps) => (
  <RowElement sm={sm} md={md} className={className} optional={optional}>
    <Typography variant="subtitle1" color="primary">
      {children}
    </Typography>
  </RowElement>
);

export default CompaniesTableHeader;
