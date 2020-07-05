import { useState } from 'react';

export type addAlertType = {
  serverity: 'success' | 'info' | 'warning' | 'error';
  message: string;
  collapse?: boolean;
};
type useAlertType = {
  alerts: Array<addAlertType>;
  addAlert: (alert: addAlertType, time?: number) => void;
};
const useAlert = (): useAlertType => {
  const [alerts, setAlerts] = useState<Array<addAlertType>>([]);
  const closeAlert = (alert: addAlertType): void => {
    setAlerts(a =>
      a.filter(
        ({ serverity, message }) =>
          message !== alert.message || serverity !== alert.serverity,
      ),
    );
  };
  const collapseAlert = (
    collapseAlert: addAlertType,
    collapse: boolean,
  ): void => {
    setAlerts(a => [
      ...a.filter(
        ({ serverity, message }) =>
          message !== collapseAlert.message ||
          serverity !== collapseAlert.serverity,
      ),
      { ...collapseAlert, collapse },
    ]);
  };
  const addAlert = (alert: addAlertType, time = 3000): void => {
    const newAllerts = [...alerts, { ...alert, collapse: false }];
    setAlerts(newAllerts);
    setTimeout(() => collapseAlert(alert, true), 0);
    setTimeout(() => collapseAlert(alert, false), time);
    setTimeout(() => closeAlert(alert), time + 200);
  };
  return { alerts, addAlert };
};

export default useAlert;
