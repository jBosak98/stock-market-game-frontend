import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  transactionButton: {
    marginRight: "auto",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

type TransactionButtonLinkProps = {
  ticker: string;
};

const TransactionButtonLink = ({ ticker }: TransactionButtonLinkProps) => {
  const styles = useStyles();
  return (
    <Link className={styles.link} to={`/company/${ticker}/transaction`}>
      <Button
        className={styles.transactionButton}
        type="submit"
        variant="contained"
        color="primary"
      >
        MAKE A TRANSACTION
      </Button>
    </Link>
  );
};

export default TransactionButtonLink;
