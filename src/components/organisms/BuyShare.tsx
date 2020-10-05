import React, { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { useMutation } from "urql";

import SimpleTitledPaper from "../molecules/SimpleTitledPaper";
import KeyValueRows from "../molecules/KeyValueRows";
import NumberInput from "../atoms/NumberInput";
import {
  ShareTransactionRequest,
  ShareTransactionResult,
} from "../../lib/types";
import buyShareMutation from "../../lib/buyShareMutation";

type BuyShareProps = {
  sharePrice: number;
  availableToInvest: number;
  ticker: string;
};
const useStyles = makeStyles(() => ({
  button: {
    margin: "10px 0px",
    marginRight: "auto",
  },
}));
const BuyShare = ({ ticker, sharePrice, availableToInvest }: BuyShareProps) => {
  const [buyShareResult, buyShare] = useMutation<
    ShareTransactionResult,
    ShareTransactionRequest
  >(buyShareMutation);
  const styles = useStyles();
  const [shareAmount, setShareAmount] = useState<undefined | number>(undefined);
  const totalCost = sharePrice * Number(shareAmount) || 0;
  const balanceAfterTransaction = availableToInvest - totalCost;

  const dataToDisplay = {
    sharePrice,
    availableToInvest,
  };
  return (
    <SimpleTitledPaper title={"Buy"}>
      <KeyValueRows data={dataToDisplay} />
      <NumberInput
        value={shareAmount}
        onChange={({ target }) =>
          setShareAmount(Number(target.value) || undefined)
        }
      />
      <KeyValueRows data={{ totalCost, balanceAfterTransaction }} />
      <Button
        className={styles.button}
        type="submit"
        disabled={!Number(shareAmount)}
        variant="contained"
        color="primary"
        onClick={() => buyShare({ amount: Number(shareAmount), ticker })}
      >
        SUBMIT
      </Button>
    </SimpleTitledPaper>
  );
};

export default BuyShare;
