import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20px",
    margin: "20px",
    width: "100%",

    backgroundColor: theme.palette.background.default,
  },
  content: {
    paddingTop: "50px",
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
