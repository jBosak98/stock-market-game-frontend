import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffTwoToneIcon from "@material-ui/icons/HighlightOffTwoTone";
import HelpOutlineTwoToneIcon from "@material-ui/icons/HelpOutlineTwoTone";
import test_icon from "../pictures/test_icon.svg";
import Paper from "@material-ui/core/Paper";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

type TestFieldType = {
  subject: string;
  owner: string;
  pub_date: string;
  result: string;
  result_positive: boolean;
  attempts: number;
  available_attempts: number;
  deadline: string;
  time: number;
};

type StatusPicType = {
  status: string;
};

function Home() {
  const x: string = "Home";
  return (
    <div className="Home-content">
      <Typography component="h1" variant="h5" color="textPrimary">
        Section 1
      </Typography>
    </div>
  );
}

export default Home;
