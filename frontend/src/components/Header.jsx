import React from 'react';
import LogoSVG from '../assets/biosec-logo.svg';
import { motion } from 'framer-motion';
export function Header() {
  return (
    <motion.header
      className="flex items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.img
        src={LogoSVG}
        alt="BioSec AI"
        className="w-12 h-12 mr-2"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <h1 className="text-2xl font-bold neon-glow">BioSec AI</h1>
    </motion.header>
  );
}