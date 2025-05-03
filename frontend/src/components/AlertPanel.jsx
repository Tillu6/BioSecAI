import React from 'react';
import { motion } from 'framer-motion';
export function AlertPanel({ alerts }) {
  return (
    <div aria-live="assertive" className="fixed top-4 right-4 space-y-2">
      {alerts.map((a, i) => (
        <motion.div
          key={i}
          className="bg-red-600 text-white p-2 rounded shadow-lg"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
        >
          {a.message}
        </motion.div>
      ))}
    </div>
  );
}