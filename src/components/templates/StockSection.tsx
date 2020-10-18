import React from "react";
import { makeStyles } from "@material-ui/core";

import ContentContainer from "../atoms/ContentContainer";
import useStock from "../../hooks/useStock";
import CompaniesTable from "../organisms/CompaniesTable";
import Loader from "../atoms/Loader";

function StockSection() {
  const { data } = useStock();
  const { companies = [] } = data?.companiesConnection || {};
  return (
    <ContentContainer>
      {(companies.length && <CompaniesTable companies={companies} />) || (
        <Loader />
      )}
    </ContentContainer>
  );
}

export default StockSection;
