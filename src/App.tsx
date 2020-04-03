import React, { useState } from "react";

import MainRoute from "./components/MainRoute";

import "./App.scss";

const App = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(true);
  return (
    <div className="App">
      <MainRoute
        isDrawerOpened={isDrawerOpened}
        setIsDrawerOpened={setIsDrawerOpened}
      />
    </div>
  );
};

export default App;
