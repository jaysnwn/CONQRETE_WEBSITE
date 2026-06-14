"use client";
import { createContext, useEffect } from 'react';

// We keep the context structure so your other pages don't crash, 
// but we permanently hardcode it to light mode.
export const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {}, 
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Force the browser body to pure white on initial load
  useEffect(() => {
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000000';
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark: false, toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}