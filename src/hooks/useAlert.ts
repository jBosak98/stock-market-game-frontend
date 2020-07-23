import { useState, useRef, useEffect, useCallback } from 'react';

type AlertContent = {
  serverity: 'success' | 'info' | 'warning' | 'error';
  message: string;
};
type Alert = {
  content: AlertContent;
  collapse: boolean;
  id: number;
};

export type {Alert, AlertContent }
const useTimeouts = () => {
  const ids = useRef<number[]>([]);
  useEffect(() => () => ids.current.map(clearTimeout)[0], []);
  return useCallback((callback: () => void, time: number, id:number) => {
       setTimeout(() => {
          ids.current.splice(ids.current.indexOf(id), 1);
          callback();
      }, time);
      ids.current.push(id);
  }, []);
};

const useAlert = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const timeout = useTimeouts()
  const alertId = useRef(0);
  const closeAlert = (id: number) => 
    setAlerts(a =>a.filter(alert =>alert.id !== id));
  
  const collapseAlert = useCallback((id: number, collapse: boolean) => 
    setAlerts(alerts => alerts.map(alert =>
      alert.id !== id ? alert : { ...alert, collapse }
      )), []);

  const addAlert = useCallback((content: AlertContent, time = 3000) => {
    const id = ++alertId.current;
    setAlerts(alerts => [...alerts, { content, collapse: false, id }]);
    timeout(() => collapseAlert(id, true), 0, id);
    timeout(() => collapseAlert(id, false), time,id);
    timeout(() => closeAlert(id), time + 200,id);
  }, []);

  return { alerts, addAlert };
};

export default useAlert;
