import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import teal from "@material-ui/core/colors/teal";
import hexToRgba from "hex-to-rgba";

const useStyles = makeStyles<Theme, SimplePaperProps>((theme) => ({
  paper: {
    padding: "20px",
    maxWidth: "1400px",
    margin: "20px",
    marginTop: "0px",
    position: "relative",
    paddingTop: (props) => (props.topbar ? "50px" : "20px"),
    [theme.breakpoints.down("md")]: {
      paddingLeft: "10px",
      paddingRight: "10px",
      marginLeft: "0px",
      marginRight: "0px",
    },
  },
  topbar: {
    height: "100%",
    maxWidth: "1200px",
    width: "80%",
    position: "relative",
    marginTop: "-20px",
    marginLeft: "30px",
    marginRight: "0px",
    padding: "15px",
    zIndex: 1,
    color: theme.palette.text.secondary,
    borderRadius: "3px",
    background: theme.palette.primary.main,
    boxShadow: `0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px ${hexToRgba(
      teal["200"],
      0.4
    )}`,
    [theme.breakpoints.up("xs")]: {
      minWidth: "40%",
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: "70%",
    },
  },
  header: {
    height: "60px",
    left: "40px",
    top: "40px",
  },
}));
type SimplePaperProps = {
  children?: React.ReactNode;
  topbar?: React.ReactNode;
  className?: string;
};
const SimplePaper = (props: SimplePaperProps) => {
  const { children, topbar, className } = props;
  const styles = useStyles(props);
  return (
    <div>
      <div className={styles.header}>
        {topbar && <div className={styles.topbar}>{topbar}</div>}
      </div>
      {children && (
        <Paper elevation={2} className={`${styles.paper} ${className || ""}`}>
          {children}
        </Paper>
      )}
    </div>
  );
};

export default SimplePaper;
