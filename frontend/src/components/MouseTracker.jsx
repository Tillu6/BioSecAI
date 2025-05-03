import React, { useEffect, useState } from 'react';
import { MousePointer } from 'lucide-react';
import { motion } from 'framer-motion';
import { postBiometric } from '../utils/api';

export function MouseTracker() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moves = [];
    const handler = e => {
      moves.push({ x: e.clientX, y: e.clientY, timestamp: Date.now() });
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handler);
    const interval = setInterval(() => {
      postBiometric('mouse', { userId: 'user1', moves });
      moves.length = 0;
    }, 15000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handler);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <MousePointer size={48} className="text-neon animate-bounce mb-2" />
      <motion.div
        initial={{ x: 0, y: 0 }}
        animate={{ x: coords.x / window.innerWidth * 200 - 100, y: coords.y / window.innerHeight * 200 - 100 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="w-48 h-48 bg-gradient-to-br from-[#3b0066] to-[#66008f] rounded-xl relative overflow-hidden"
      >
        <div className="absolute top-2 left-2 text-xs text-white/70">x: {coords.x}</div>
        <div className="absolute top-2 right-2 text-xs text-white/70">y: {coords.y}</div>
      </motion.div>
      <p className="mt-2 text-sm opacity-80">Mouse Position Tracker</p>
    </div>
  );
}