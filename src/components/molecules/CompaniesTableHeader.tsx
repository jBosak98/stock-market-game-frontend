import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Grid } from "@material-ui/core";

import RowElement from "../atoms/RowElement";

const useStyles = makeStyles((theme) => ({
  header: {
    borderBottom: "1px #ffffff solid",
  },
}));

const CompaniesTableHeader = () => {
  return (
    <>
      <Grid spacing={3} alignContent="space-around" container direction="row">
        <HeaderRowElement optional>SYMBOL</HeaderRowElement>
        <HeaderRowElement>NAME</HeaderRowElement>
        <HeaderRowElement>CHANGE</HeaderRowElement>
        <HeaderRowElement optional>CHANGE PERCENTAGE</HeaderRowElement>
        <HeaderRowElement>LAST PRICE</HeaderRowElement>
      </Grid>
    </>
  );
};

type HeaderRowElementProps = {
  children: React.ReactNode;
  className?: string;
  optional?: boolean;
};
const HeaderRowElement = ({ optional, children }: HeaderRowElementProps) => (
  <RowElement optional={optional}>
    <Typography variant="subtitle1" color="primary">
      {children}
    </Typography>
  </RowElement>
);

export default CompaniesTableHeader;
