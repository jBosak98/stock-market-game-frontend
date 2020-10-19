import React, { useState } from "react";
import { useMutation } from "urql";
import { Button, makeStyles } from "@material-ui/core";

import SimpleTitledPaper from "../molecules/SimpleTitledPaper";
import sellShareMutation from "../../lib/sellShareMutation";
import {
  ShareTransactionRequest,
  ShareTransactionResult,
  User,
} from "../../lib/types";
import NumberInput from "../atoms/NumberInput";
import KeyValueRows from "../molecules/KeyValueRows";
import { useAlertContext } from "../../contexts/AlertContext";
import showErrors from "../../lib/showErrors";
import useUser, { meQuery } from "../../hooks/useUser";

const useStyles = makeStyles(() => ({
  button: {
    margin: "10px 0px",
    marginRight: "auto",
  },
}));

type SellShareProps = {
  ticker: string;
  sharePrice: number;
  availableShares: number;
  balance: number;
};
const SellShare = ({
  ticker,
  sharePrice,
  availableShares,
  balance,
}: SellShareProps) => {
  const [shareAmount, setShareAmount] = useState<undefined | number>(undefined);
  const styles = useStyles();
  const { addAlert } = useAlertContext();
  const [_, refetchUser] = useMutation<{ me: User }>(meQuery);
  const setUser = useUser(({ setUser }) => setUser);

  const [sellShareResult, sellShare] = useMutation<
    ShareTransactionResult,
    ShareTransactionRequest
  >(sellShareMutation);
  const onSubmit = async () => {
    const response = await sellShare({ amount: Number(shareAmount), ticker });
    const user = await refetchUser();
    user.data?.me && setUser(user.data.me);
    showErrors(response, addAlert, "Shares successfully sold");
  };
  const moneyToAdd = sharePrice * Number(shareAmount) || 0;
  const balanceAfterTransaction = balance + moneyToAdd;
  return (
    <SimpleTitledPaper title={"Sell"}>
      <KeyValueRows data={{ sharePrice, balance, availableShares }} />
      <NumberInput
        value={shareAmount}
        onChange={({ target }) =>
          setShareAmount(Number(target.value) || undefined)
        }
      />
      <KeyValueRows data={{ balanceAfterTransaction }} />
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

export default SellShare;
