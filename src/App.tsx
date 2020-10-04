import React from "react";

import "./App.scss";
import ApplicationLayout from "./components/molecules/ApplicationLayout";
import { ThemeModeProvider } from "./contexts/ThemeModeContext";
import { UserContextProvider } from "./contexts/UserContext";
import { AlertContextProvider } from "./contexts/AlertContext";
import { createClient, Provider } from "urql";

const App = () => {
  const client = createClient({ url: "http://localhost:8080/graphql" });

  return (
    <div className="App">
      <Provider value={client}>
        <ThemeModeProvider>
          <AlertContextProvider>
            <UserContextProvider>
              <ApplicationLayout />
            </UserContextProvider>
          </AlertContextProvider>
        </ThemeModeProvider>
      </Provider>
    </div>
  );
};

export default App;
