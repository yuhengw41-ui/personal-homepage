'use client';

import Link from 'next/link';
import { LanguageToggle, text, useLanguage } from './language-toggle';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { label: { en: 'Manifesto', zh: '宣言' }, href: '/#manifesto' },
  { label: { en: 'Work', zh: '作品' }, href: '/#work' },
  { label: { en: 'Photography', zh: '摄影' }, href: '/#photography' },
  { label: { en: 'Notes', zh: '札记' }, href: '/#notes' },
  { label: { en: 'Now', zh: '此刻' }, href: '/now' },
];

export function Header() {
  const { language } = useLanguage();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-deepBlack/10 bg-warmWhite/80 backdrop-blur-xl dark:border-warmWhite/10 dark:bg-deepBlack/70">
      <div className="mx-auto flex h-16 w-[calc(100%_-_32px)] max-w-[1280px] items-center justify-between">
        <Link className="font-serif text-lg tracking-[0.08em]" href="/">
          Rory syhran
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 text-[0.68rem] uppercase tracking-[0.16em] text-deepBlack/60 dark:text-warmWhite/60 md:flex">
            {navItems.map((item) => (
              <Link
                className="transition-colors duration-500 ease-editorial hover:text-deepBlack dark:hover:text-warmWhite"
                href={item.href}
                key={item.href}
              >
                {text(item.label, language)}
              </Link>
            ))}
          </nav>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-deepBlack/45 dark:text-warmWhite/45">
      {children}
    </p>
  );
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto w-[calc(100%_-_32px)] max-w-[1280px] pt-16">{children}</main>
    </>
  );
}
