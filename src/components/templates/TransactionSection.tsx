import React from "react";
import { Grid } from "@material-ui/core";

import ContentContainer from "../atoms/ContentContainer";
import SimplePaper from "../atoms/SimplePaper";
import useCompany from "../../hooks/useCompany";
import Loader from "../atoms/Loader";
import TransactionSectionHeader from "../molecules/TransactionSectionHeader";
import { useUserContext } from "../../contexts/UserContext";
import BuyShare from "../organisms/BuyShare";
import SellShare from "../organisms/SellShare";

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
  const user = useUserContext()((store) => store.user);

  if ((!data.getCompany && !fetching) || !!error) {
    history && history.push("/stock");
    return <Loader />;
  }
  if (fetching) return <Loader />;

  const sharePrice = data.getCompany?.quote.currentPrice || 0;
  const availableToInvest = user?.assets?.money || 0;
  const availableSharesToSell =
    user?.assets.shares.find(
      ({ companyId }) => companyId === data?.getCompany?.id
    )?.amount || 0;

  const topbar = TransactionSectionHeader({
    ticker,
    name: data.getCompany?.name,
  });

  return (
    <ContentContainer>
      <SimplePaper topbar={topbar} />
      <Grid container justify="center" direction="row">
        <BuyShare
          ticker={ticker}
          availableToInvest={availableToInvest}
          sharePrice={sharePrice}
        />
        <SellShare
          ticker={ticker}
          balance={availableToInvest}
          availableShares={availableSharesToSell}
          sharePrice={sharePrice}
        />
      </Grid>
    </ContentContainer>
  );
};

export default TransactionSection;
