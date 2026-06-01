'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('theme');
    const shouldUseDark =
      stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', shouldUseDark);
    setDark(shouldUseDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    window.localStorage.setItem('theme', next ? 'dark' : 'light');
    setDark(next);
  }

  return (
    <button
      aria-label="Toggle color mode"
      className="inline-flex h-10 w-10 items-center justify-center border border-deepBlack/15 text-deepBlack transition-colors duration-500 ease-editorial hover:bg-deepBlack hover:text-warmWhite dark:border-warmWhite/20 dark:text-warmWhite dark:hover:bg-warmWhite dark:hover:text-deepBlack"
      type="button"
      onClick={toggleTheme}
    >
      {dark ? <Sun size={16} strokeWidth={1.4} /> : <Moon size={16} strokeWidth={1.4} />}
    </button>
  );
}
