import React from "react";
import "./Tests.css";
import { Link } from "react-router-dom";

function Tests() {
  const x: string = "Tests";
  return (
    <div className="Tests">
      <p>Hello World {x}</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default Tests;
