import React from "react";
import "./MakeTest.css";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

function MakeTest() {
  const x: string = "MakeTest";
  return (
    <div className="MakeTest">
      <Typography component="h1" variant="h5" color="textPrimary">
        Section 2
      </Typography>
    </div>
  );
}

export default MakeTest;
