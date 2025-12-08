"use client";

import { useTheme } from 'next-themes';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg" style={{backgroundColor: 'rgba(15, 23, 42, 0.8)'}}></div>
    );
  }

  const currentTheme = theme || 'dark';
  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-all duration-300 flex items-center justify-center"
      style={{
        backgroundColor: currentTheme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
        border: `1px solid ${currentTheme === 'dark' ? 'rgba(60, 119, 173, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`,
        color: currentTheme === 'dark' ? '#f58643' : '#3c77ad'
      }}
      onMouseOver={e => {
        e.currentTarget.style.backgroundColor = currentTheme === 'dark' ? 'rgba(15, 23, 42, 1)' : 'rgba(255, 255, 255, 1)';
        e.currentTarget.style.borderColor = currentTheme === 'dark' ? '#f58643' : '#3c77ad';
      }}
      onMouseOut={e => {
        e.currentTarget.style.backgroundColor = currentTheme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)';
        e.currentTarget.style.borderColor = currentTheme === 'dark' ? 'rgba(60, 119, 173, 0.3)' : 'rgba(0, 0, 0, 0.1)';
      }}
      aria-label={currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {currentTheme === 'dark' ? (
        <FaSun className="w-4 h-4" />
      ) : (
        <FaMoon className="w-4 h-4" />
      )}
    </button>
  );
};

