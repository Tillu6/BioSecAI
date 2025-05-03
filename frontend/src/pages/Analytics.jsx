import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
export default function Analytics() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('/api/analytics').then(r => r.json()).then(setData);
  }, []);
  return (
    <LineChart width={600} height={300} data={data} role="table" aria-label="Authentication trends">
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="count" stroke="#39ff14" strokeWidth={2} />
    </LineChart>
  );
}