import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import teal from "@material-ui/core/colors/teal";
import hexToRgba from "hex-to-rgba";

const useStyles = makeStyles<Theme, SimplePaperProps>((theme) => ({
  paper: {
    padding: "20px",
    margin: "20px",
    paddingTop: (props) => (props.topbar ? "50px" : "20px"),
    [theme.breakpoints.down("md")]: {
      paddingLeft: "10px",
      paddingRight: "10px",
      marginLeft: "0px",
      marginRight: "0px",
    },
  },
  topbar: {
    minWidth: "30%",
    height: "100%",
    display: "inline-block",
    marginTop: "-20px",
    padding: "15px",
    marginRight: "0px",
    borderRadius: "3px",
    background: theme.palette.primary.main,
    boxShadow: `0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px ${hexToRgba(
      teal["200"],
      0.4
    )}`,
  },
  header: {
    display: "inline-block",
    position: "relative",
    width: "100%",
    height: "60px",
    left: "40px",
    top: "40px",
  },
}));
type SimplePaperProps = {
  children: React.ReactNode;
  topbar?: React.ReactNode;
};
const SimplePaper = (props: SimplePaperProps) => {
  const { children, topbar } = props;
  const styles = useStyles(props);
  return (
    <div>
      <div className={styles.header}>
        {topbar && <div className={styles.topbar}>{topbar}</div>}
      </div>
      <Paper elevation={2} className={styles.paper}>
        {children}
      </Paper>
    </div>
  );
};

export default SimplePaper;
