import React, { useContext, createContext } from "react";
import useAlert, { Alert, AlertContent } from "../hooks/useAlert";

type AlertContextType = {
  alerts: Alert[];
  addAlert: AddAlertType;
};
export type AddAlertType = (alert: AlertContent, time?: number) => void;

const AlertContext = createContext<AlertContextType>({
  alerts: [],
  addAlert: () => {},
});

const useAlertContext = () => useContext(AlertContext);

type AlertContextProviderProps = {
  children?: React.ReactNode;
};

const AlertContextProvider = ({ children }: AlertContextProviderProps) => {
  const { alerts, addAlert } = useAlert();
  return (
    <AlertContext.Provider value={{ alerts, addAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContext, useAlertContext, AlertContextProvider };
