import React from "react";

import "./App.scss";
import ApplicationLayout from "./components/molecules/ApplicationLayout";
import { ThemeModeProvider } from "./contexts/ThemeModeContext";
import { UserContextProvider } from "./contexts/UserContext";
import { AlertContextProvider } from "./contexts/AlertContext";
import { createClient, Provider } from "urql";

const getToken = () => localStorage.getItem("token");

const App = () => {
  const client = createClient({
    url: "https://stock-market-game.me/graphql",
    fetchOptions: () => {
      const token = getToken();
      return {
        headers: { authorization: token ? `Bearer ${token}` : "" },
      };
    },
  });

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
