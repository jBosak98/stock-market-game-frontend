import MainRoute from "./components/MainRoute";
import React from "react";

import { ThemeModeProvider, useThemeMode } from './contexts/ThemeModeContext';
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
