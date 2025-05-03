import React from 'react';
import { KeystrokeCapture } from './components/KeystrokeCapture';
import { MouseTracker }      from './components/MouseTracker';
import { GestureCanvas }     from './components/GestureCanvas';
import { EmotionDashboard }  from './components/EmotionDashboard';
import { motion }            from 'framer-motion';
import './index.css';

export default function App() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-midnight via-[#1f1b2e] to-[#2e1b3f]">
      <motion.h1
        className="text-5xl font-extrabold text-center mb-8 neon-glow"
        initial={{ opacity: 0, y: -30 }}
        animate={{   opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        BioSec AI Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          <KeystrokeCapture key="k" />,
          <MouseTracker      key="m" />,
          <GestureCanvas     key="g" />,
          <EmotionDashboard  key="e" />
        ].map((Comp, i) => (
          <motion.div
            key={i}
            className="p-4 bg-white/10 backdrop-blur-lg rounded-2xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {Comp}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
