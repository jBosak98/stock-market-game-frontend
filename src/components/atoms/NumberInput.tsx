import React from "react";
import { Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  input: {
    color: theme.palette.grey[200],
    margin: "5px 0px",
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "&::before": {
      borderColor: `${theme.palette.grey["100"]} !important`,
    },
  },
  endAdornment: {
    paddingRight: "159px",
    [theme.breakpoints.down(600)]: {
      paddingRight: "0px",
    },
  },
}));

type NumberInputProps = {
  value?: number;
  onChange:
    | ((
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      ) => void)
    | undefined;
};

const NumberInput = ({ value, onChange }: NumberInputProps) => {
  const styles = useStyles();

  return (
    <Input
      value={value || ""}
      placeholder="amount of"
      onChange={onChange}
      endAdornment={<p className={styles.endAdornment}>shares</p>}
      className={styles.input}
      defaultValue={undefined}
      type={"number"}
    />
  );
};

export default NumberInput;
