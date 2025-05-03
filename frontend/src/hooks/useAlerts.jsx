import { useEffect, useState } from 'react';
export function useAlerts() {
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001/alerts');
    ws.onmessage = e => setAlerts(prev => [...prev, JSON.parse(e.data)]);
    return () => ws.close();
  }, []);
  return alerts;
}