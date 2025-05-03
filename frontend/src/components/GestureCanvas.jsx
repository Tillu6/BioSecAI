import React, { useRef, useEffect, useState } from 'react';
import { postBiometric } from '../utils/api';
import { motion } from 'framer-motion';

export function GestureCanvas() {
  const canvasRef = useRef();
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext('2d');
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#39ff14';
    let drawing = false;
    let current = [];

    const start = e => {
      drawing = true;
      current = [{ x: e.offsetX, y: e.offsetY }];
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    };
    const draw = e => {
      if (!drawing) return;
      current.push({ x: e.offsetX, y: e.offsetY });
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    };
    const end = () => {
      drawing = false;
      setPaths(prev => [...prev, current]);
      postBiometric('gesture', { userId: 'user1', path: current });
    };

    c.addEventListener('mousedown', start);
    c.addEventListener('mousemove', draw);
    c.addEventListener('mouseup', end);
    return () => {
      c.removeEventListener('mousedown', start);
      c.removeEventListener('mousemove', draw);
      c.removeEventListener('mouseup', end);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <motion.canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="bg-white/5 rounded-lg shadow-lg"
        whileHover={{ scale: 1.02 }}
      />
      <p className="mt-2 text-sm opacity-80">Draw your gesture</p>
    </div>
  );
}