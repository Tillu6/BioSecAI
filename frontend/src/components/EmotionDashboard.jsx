import React, { useState, useEffect } from 'react';
import { RadialBarChart, RadialBar, Legend } from 'recharts';
import { postBiometric } from '../utils/api';

export function EmotionDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch array of {label, confidence}
    fetch('http://localhost:3001/api/biometrics/emotion')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-2 neon-glow">Emotion Profile</h3>
      <RadialBarChart width={250} height={250} cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={data} startAngle={90} endAngle={-270}>
        <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background dataKey="confidence" />
        <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ color: '#fff' }} />
      </RadialBarChart>
    </div>
  );
}