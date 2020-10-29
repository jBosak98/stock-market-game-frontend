import React from "react";
import { Grid } from "@material-ui/core";

import ContentContainer from "../atoms/ContentContainer";
import useCompany from "../../hooks/useCompany";
import DataPaper from "../organisms/DataPaper";
import CompanyDetailsChartContainer from "../organisms/CompanyDetailsChartContainer";
import Loader from "../atoms/Loader";

type CompanyDetailsProps = {
  children?: React.ReactNode;
  history?: { push: (path: string) => any };
  match?: {
    params: {
      ticker: string;
    };
  };
};

const CompanyDetails = ({ match, history }: CompanyDetailsProps) => {
  const { params } = match || {};
  const { ticker = "" } = params || {};
  const { data = {}, fetching, error } = useCompany(ticker);
  if ((!data.getCompany && !fetching) || !!error) {
    history && history.push("/stock");
    return <Loader />;
  }
  if (fetching) return <Loader />;

  const { getCompany = { financials: {} } } = data;
  const { financials = {} } = getCompany || {};
  return (
    <>
      <ContentContainer>
        <CompanyDetailsChartContainer ticker={ticker} />
        <Grid container justify="center" direction="row">
          <DataPaper data={getCompany} title="key data" />
          <DataPaper data={financials} />
        </Grid>
      </ContentContainer>
    </>
  );
};

export default CompanyDetails;
