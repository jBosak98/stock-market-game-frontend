import React, { useContext, createContext } from "react";
import useAlert, { addAlertType } from "../hooks/useAlert";

type AlertType = {
  serverity: "success" | "info" | "warning" | "error";
  message: string;
  collapse?: boolean;
};

type AlertContextType = {
  alerts: Array<AlertType>;
  addAlert: (alert: addAlertType, time?: number) => void;
};

const AlertContext = createContext<AlertContextType>({
  alerts: [],
  addAlert: () => {},
});

const useAlertContext = () => useContext(AlertContext);

type AlertContextProviderProps = {
  children?: React.ReactNode;
};

const AlertContextProvider: React.FC<AlertContextProviderProps> = ({
  children,
}: AlertContextProviderProps) => {
  const { alerts, addAlert } = useAlert();
  return (
    <AlertContext.Provider value={{ alerts, addAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContext, useAlertContext, AlertContextProvider };
