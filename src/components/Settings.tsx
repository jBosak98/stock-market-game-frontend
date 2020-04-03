import React from "react";
import "./Settings.css";
import { Link } from "react-router-dom";

function Settings() {
  const x: string = "Settings";
  return (
    <div className="Settings">
      <p>Hello World {x}</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default Settings;
