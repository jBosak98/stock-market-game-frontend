import React from "react";
import "./Group.css";
import Typography from "@material-ui/core/Typography";

function Group() {
  const x: string = "Group";
  return (
    <div className="Group">
      <Typography component="h1" variant="h5" color="textPrimary">
        Section 3
      </Typography>
    </div>
  );
}

export default Group;
