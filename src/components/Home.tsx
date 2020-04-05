import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffTwoToneIcon from "@material-ui/icons/HighlightOffTwoTone";
import HelpOutlineTwoToneIcon from "@material-ui/icons/HelpOutlineTwoTone";
import test_icon from "../pictures/test_icon.svg";
import Paper from "@material-ui/core/Paper";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

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

function StatusIcon(props: StatusPicType) {
  const status = props.status;
  if (status === "todo") {
    return <HelpOutlineTwoToneIcon style={{ color: "yellow" }} />;
  }
  if (status === "failed") {
    return <HighlightOffTwoToneIcon style={{ color: "#ff4545" }} />;
  }
  if (status === "passed") {
    return <CheckCircleIcon style={{ color: "lightgreen" }} />;
  }
  return null;
}

type TestIconType = {
  status: string;
};

function TestIcon(props: TestIconType) {
  const status = props.status;
  return (
    <div className="test-icon">
      <img src={test_icon} alt="Test icon" />
      <StatusIcon status={status} />
    </div>
  );
}

function TestField(props: TestFieldType) {
  const subject: string = props.subject;
  const owner: string = props.owner;
  const pub_date: string = props.pub_date;
  const result: string = props.result;
  const result_positive: boolean = props.result_positive;
  const attempts: number = props.attempts;
  const available_attempts: number = props.available_attempts;
  const deadline: string = props.deadline;
  const time: number = props.time;

  let field = (
    <div className="paper">
      <Paper elevation={2}>
        <div className="flex-container">
          <TestIcon status="passed" />
          <p>{subject}</p>
          <p>{owner}</p>
          <p>{pub_date}</p>
          <p>{result}</p>
          <p>{result_positive}</p>
          <p>{attempts}</p>
          <p>{available_attempts}</p>
          <p>{deadline}</p>
          <p>{time}</p>
        </div>
      </Paper>
    </div>
  );

  return field;
}

function Home() {
  const x: string = "Home";
  return (
    <div className="Home-content">
      <p>Hello World {x}</p>
      <h1>TODO</h1>
      <TestField
        subject="Pszyrka"
        owner="Janusz"
        pub_date="21.37.1410"
        result="123/151900"
        result_positive={false}
        attempts={1}
        available_attempts={3}
        deadline="29.02.2021"
        time={20}
      />
    </div>
  );
}

export default Home;
