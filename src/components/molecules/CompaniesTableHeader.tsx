import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Grid } from "@material-ui/core";

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

const CompaniesTableHeader = () => {
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
        <HeaderRowElement className={styles.element} optional>
          SYMBOL
        </HeaderRowElement>
        <HeaderRowElement className={styles.element}>NAME</HeaderRowElement>
        <HeaderRowElement className={styles.element}>CHANGE</HeaderRowElement>
        <HeaderRowElement className={styles.element} optional>
          CHANGE PERCENTAGE
        </HeaderRowElement>
        <HeaderRowElement className={styles.element}>
          LAST PRICE
        </HeaderRowElement>
      </Grid>
    </>
  );
};

type HeaderRowElementProps = {
  children: React.ReactNode;
  className?: string;
  optional?: boolean;
};
const HeaderRowElement = ({
  optional,
  children,
  className,
}: HeaderRowElementProps) => (
  <RowElement className={className} optional={optional}>
    <Typography variant="subtitle1" color="primary">
      {children}
    </Typography>
  </RowElement>
);

export default CompaniesTableHeader;
