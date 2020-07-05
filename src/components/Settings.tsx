import React from "react";
import "./Settings.css";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

function Settings() {
  const x: string = "Settings";
  return (
    <div className="Settings">
      <Typography component="h1" variant="h5" color="textPrimary">
        Section 5 (Settings)
      </Typography>
    </div>
  );
}

export default Settings;
