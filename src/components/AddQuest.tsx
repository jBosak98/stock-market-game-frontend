import React from "react";
import "./AddQuest.css";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

function AddQuest() {
  const x: string = "AddQuest";
  return (
    <div className="AddQuest">
      <Typography component="h1" variant="h5" color="textPrimary">
        Section 4
      </Typography>
    </div>
  );
}

export default AddQuest;
