import React, { createContext, useState, useEffect } from 'react';

// 1. Create the context
export const ThemeContext = createContext({
  dark: false,
  setDark: () => {}
});

// 2. Provider component
export function ThemeProvider({ children }) {
  // Initialize from localStorage or system preference
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Whenever `dark` changes, apply class and persist
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
