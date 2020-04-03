import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const x: string = "Home";
  return (
    <div className="Home">
      <p>Hello World {x}</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default Home;
