import React from "react";
import { Grid } from "@material-ui/core";

import ContentContainer from "../atoms/ContentContainer";
import SimplePaper from "../atoms/SimplePaper";
import useCompany from "../../hooks/useCompany";
import DataPaper from "../organisms/DataPaper";

type CompanyDetailsProps = {
  children?: React.ReactNode;
  match?: {
    params: {
      ticker: string;
    };
  };
};

const CompanyDetails = ({ match }: CompanyDetailsProps) => {
  const { params } = match || {};
  const { ticker = null } = params || {};
  const { data } = useCompany(ticker);
  console.log(data);
  const { getCompany } = data || {};
  const { financials = {} } = getCompany || {};
  return (
    <>
      <ContentContainer>
        <SimplePaper topbar={<>{ticker}</>}>xd</SimplePaper>
        <Grid container justify="space-around" direction="row">
          <DataPaper data={financials} title="key data" />
          <DataPaper data={financials} />
        </Grid>
      </ContentContainer>
    </>
  );
};

export default CompanyDetails;
