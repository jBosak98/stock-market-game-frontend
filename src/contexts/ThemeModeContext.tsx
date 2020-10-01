import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import lime from "@material-ui/core/colors/lime";

interface Props {
  children?: React.ReactNode;
}
interface DarkModeContextProps {
  darkMode: boolean;
  setDarkMode(darkMode: boolean): void;
}
export const ThemeModeContext = React.createContext<DarkModeContextProps>({
  darkMode: false,
  setDarkMode: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: teal["500"],
      dark: teal["500"],
    },
    secondary: {
      light: "#0066ff",
      main: lime["500"],
      contrastText: "#ffcc00",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      default: "#121212",
      paper: "#272c34",
    },
    grey: {
      "200": "#b2b2b2",
      "100": "#1a1a1a",
      "50": "#8f8f8f",
    },
  },
});

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: teal["500"],
      dark: teal["500"],
    },
    secondary: {
      light: "#0066ff",
      main: lime["500"],
      contrastText: "#ffcc00",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      default: "#dfdfdf",
      paper: "#f5f5f5",
    },
    grey: {
      "200": "#4D4D4D",
      "100": "#E5E5E5",
      "50": "#707070",
    },
  },
});

export const ThemeModeProvider = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  return (
    <ThemeModeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      <ThemeProvider theme={darkMode ? darkTheme : theme}>
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
