'use client';

import { useEffect, useState } from 'react';
import type { Language, LocalizedText } from '@/lib/profile';

const STORAGE_KEY = 'language';

function isLanguage(value: string | null): value is Language {
  return value === 'en' || value === 'zh';
}

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial = isLanguage(stored)
      ? stored
      : window.navigator.language.toLowerCase().startsWith('zh')
        ? 'zh'
        : 'en';
    setLanguageState(initial);
    document.documentElement.lang = initial === 'zh' ? 'zh-CN' : 'en';

    function handleLanguageChange(event: Event) {
      const next = (event as CustomEvent<Language>).detail;
      if (isLanguage(next)) {
        setLanguageState(next);
        document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
      }
    }

    window.addEventListener('languagechange:site', handleLanguageChange);
    return () => window.removeEventListener('languagechange:site', handleLanguageChange);
  }, []);

  function setLanguage(next: Language) {
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new CustomEvent<Language>('languagechange:site', { detail: next }));
  }

  return { language, setLanguage };
}

export function text(value: LocalizedText, language: Language) {
  return value[language];
}

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const next = language === 'en' ? 'zh' : 'en';

  return (
    <button
      aria-label={language === 'en' ? 'Switch to Chinese' : '切换到英文'}
      className="inline-flex h-10 min-w-12 items-center justify-center border border-deepBlack/15 px-3 text-[0.68rem] uppercase tracking-[0.14em] text-deepBlack transition-colors duration-500 ease-editorial hover:bg-deepBlack hover:text-warmWhite dark:border-warmWhite/20 dark:text-warmWhite dark:hover:bg-warmWhite dark:hover:text-deepBlack"
      type="button"
      onClick={() => setLanguage(next)}
    >
      {language === 'en' ? '中' : 'EN'}
    </button>
  );
}
