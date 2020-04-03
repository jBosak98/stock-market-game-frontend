import React from "react";
import "./MakeTest.css";
import { Link } from "react-router-dom";

function MakeTest() {
  const x: string = "MakeTest";
  return (
    <div className="MakeTest">
      <p>Hello World {x}</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default MakeTest;
