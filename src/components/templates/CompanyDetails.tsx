import React from "react";
import { Grid } from "@material-ui/core";

import ContentContainer from "../atoms/ContentContainer";
import useCompany from "../../hooks/useCompany";
import DataPaper from "../organisms/DataPaper";
import CompanyDetailsHeader from "../organisms/CompanyDetailsHeader";

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
  const { ticker = "" } = params || {};
  const { data } = useCompany(ticker);
  const { getCompany = { financials: {} } } = data || {};
  const { financials = {} } = getCompany || {};
  return (
    <>
      <ContentContainer>
        <CompanyDetailsHeader ticker={ticker} />
        <Grid container justify="space-around" direction="row">
          <DataPaper data={getCompany} title="key data" />
          <DataPaper data={financials} />
        </Grid>
      </ContentContainer>
    </>
  );
};

export default CompanyDetails;
