import React, { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';
import { Header } from './components/Header';
import { useAlerts } from './hooks/useAlerts';
import { AlertPanel } from './components/AlertPanel';
import { KeystrokeCapture } from './components/KeystrokeCapture';
import { MouseTracker }      from './components/MouseTracker';
import { GestureCanvas }     from './components/GestureCanvas';
import { EmotionDashboard }  from './components/EmotionDashboard';
import Profile               from './pages/Profile';
import Analytics             from './pages/Analytics';
import { motion }            from 'framer-motion';
import './index.css';

function Dashboard() {
  return (
    <>
      <motion.h1
        className="text-5xl font-extrabold text-center my-8 neon-glow"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        BioSec AI Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[<KeystrokeCapture key="k" />,
          <MouseTracker      key="m" />,
          <GestureCanvas     key="g" />,
          <EmotionDashboard  key="e" />
        ].map((Comp, i) => (
          <motion.div
            key={i}
            className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {Comp}
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default function App() {
  const { dark, setDark } = useContext(ThemeContext);
  const alerts = useAlerts();

  return (
    <div className={`min-h-screen p-4 transition-colors duration-500 ${
      dark ? 'bg-midnight text-white' : 'bg-white text-black'
    }`}>
      {/* Real‑time Alerts */}
      <AlertPanel alerts={alerts} />

      {/* Logo + Title + Theme Toggle */}
      <Header />
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-4 right-4 px-3 py-1 bg-neon text-midnight rounded shadow-lg"
      >
        {dark ? '☀️ Light' : '🌙 Dark'}
      </button>

      {/* Nav Links */}
      <nav className="my-4 flex justify-center space-x-6">
        <Link to="/"        className="hover:underline">Dashboard</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
        <Link to="/analytics" className="hover:underline">Analytics</Link>
      </nav>

      {/* Route Views */}
      <Routes>
        <Route path="/"        element={<Dashboard />} />
        <Route path="/profile" element={<Profile />}   />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
}
