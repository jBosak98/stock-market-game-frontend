import MainRoute from "./routes/MainRoute";
import React from "react";

import { ThemeModeProvider } from "./contexts/ThemeModeContext";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <ThemeModeProvider>
        <MainRoute />
      </ThemeModeProvider>
    </div>
  );
};

export default App;
