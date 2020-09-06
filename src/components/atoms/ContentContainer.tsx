import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20px",
    margin: "20px",
    width: "100%",
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down("md")]: {
      paddingLeft: "10px",
      paddingRight: "10px",
      marginLeft: "0px",
      marginRight: "0px",
    },
  },
  content: {
    paddingTop: "50px",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      paddingTop: "0px",
    },
  },
}));
const ContentContainer = ({ children }: { children: React.ReactNode }) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default ContentContainer;
