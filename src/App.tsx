import React from "react";

import "./App.scss";
import ApplicationLayout from "./components/ApplicationLayout";
import { ThemeModeProvider } from "./contexts/ThemeModeContext";

const App = () => {
  return (
    <div className="App">
      <ThemeModeProvider>
        <ApplicationLayout />
      </ThemeModeProvider>
    </div>
  );
};

export default App;
