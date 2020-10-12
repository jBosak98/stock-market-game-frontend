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
import { useAlertContext } from "../../contexts/AlertContext";
import showErrors from "../../lib/showErrors";

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
  const { addAlert } = useAlertContext();
  const styles = useStyles();
  const [shareAmount, setShareAmount] = useState<undefined | number>(undefined);
  const totalCost = sharePrice * Number(shareAmount) || 0;
  const balanceAfterTransaction = availableToInvest - totalCost;

  const dataToDisplay = {
    sharePrice,
    availableToInvest,
  };

  const onSubmit = async () => {
    const response = await buyShare({ amount: Number(shareAmount), ticker });
    showErrors(response, addAlert, "Shares successfully purchased");
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
        onClick={onSubmit}
      >
        SUBMIT
      </Button>
    </SimpleTitledPaper>
  );
};

export default BuyShare;
