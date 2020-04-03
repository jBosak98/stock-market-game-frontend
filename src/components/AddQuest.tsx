import React from "react";
import "./AddQuest.css";
import { Link } from "react-router-dom";

function AddQuest() {
  const x: string = "AddQuest";
  return (
    <div className="AddQuest">
      <p>Hello World {x}</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default AddQuest;
