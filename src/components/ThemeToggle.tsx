'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-10 h-10 rounded-lg border border-border-light dark:border-dark-border ${className}`} />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      className={`p-2.5 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald ${
        theme === 'light'
          ? 'bg-white border-border-light text-forest hover:bg-ivory hover:text-forest'
          : 'bg-dark-surface border-dark-border text-dark-text hover:bg-dark-elevated'
      } ${className}`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-forest" />
      ) : (
        <Sun className="w-5 h-5 text-lime" />
      )}
    </button>
  );
}
