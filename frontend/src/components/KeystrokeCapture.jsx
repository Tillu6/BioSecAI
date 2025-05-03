import React, { useEffect, useState } from 'react';
import { Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { postBiometric } from '../utils/api';

export function KeystrokeCapture() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const events = [];
    const handler = e => {
      events.push({ key: e.key, type: e.type, timestamp: Date.now() });
      setCount(prev => prev + 1);
    };

    window.addEventListener('keydown', handler);
    window.addEventListener('keyup', handler);

    const interval = setInterval(() => {
      if (events.length) {
        postBiometric('keystroke', { userId: 'user1', events });
        events.length = 0;
        setCount(0);
      }
    }, 15000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handler);
      window.removeEventListener('keyup', handler);
    };
  }, []);

  return (
    <div
      role="region"
      aria-label="Keystroke activity recording"
      tabIndex={0}
      className="flex flex-col items-center"
    >
      <Cpu size={48} className="text-neon mb-2 animate-pulse" />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-neon to-[#00dfee]"
      >
        <span className="text-2xl font-semibold">{count}</span>
      </motion.div>
      <p className="mt-2 text-sm opacity-80">Keystrokes / last 15s</p>
    </div>
  );
}
