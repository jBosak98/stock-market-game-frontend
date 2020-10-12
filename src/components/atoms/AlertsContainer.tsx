import React from "react";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import type { Alert as AlertType } from "../../hooks/useAlert";

type AlertsContainerProps = {
  alerts: AlertType[];
};

const useStyles = makeStyles(() => ({
  alertContainer: {
    position: "absolute",
    right: "50px",
    top: "80px",
  },
  alert: {
    margin: "5px",
  },
}));

const AlertsContainer = ({ alerts }: AlertsContainerProps) => {
  const classes = useStyles();
  return (
    <div className={classes.alertContainer}>
      {alerts.map(({ collapse, content }, index) => (
        <Slide
          direction="left"
          in={collapse}
          key={index}
          mountOnEnter
          unmountOnExit
        >
          <Alert
            className={classes.alert}
            variant="filled"
            severity={content.serverity}
          >
            {content.message}
          </Alert>
        </Slide>
      ))}
    </div>
  );
};

export default AlertsContainer;
