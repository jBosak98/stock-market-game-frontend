import React from "react";

import ContentContainer from "../atoms/ContentContainer";
import SimplePaper from "../atoms/SimplePaper";
import useCompany from "../../hooks/useCompany";
import Loader from "../atoms/Loader";
import TransactionSectionHeader from "../molecules/TransactionSectionHeader";

type TransactionSectionProps = {
  children?: React.ReactNode;
  history?: { push: (path: string) => any };
  match?: {
    params: {
      ticker: string;
    };
  };
};

const TransactionSection = ({ match, history }: TransactionSectionProps) => {
  const { params } = match || {};
  const { ticker = "" } = params || {};
  const { data = {}, fetching, error } = useCompany(ticker);
  if ((!data.getCompany && !fetching) || !!error) {
    history && history.push("/stock");
    return <Loader />;
  }
  if (fetching) return <Loader />;
  console.log(data);
  return (
    <ContentContainer>
      <SimplePaper
        topbar={
          <TransactionSectionHeader
            ticker={ticker}
            name={data.getCompany?.name}
          />
        }
      />
    </ContentContainer>
  );
};

export default TransactionSection;
