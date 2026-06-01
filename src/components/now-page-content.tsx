'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { profile } from '@/lib/profile';
import { text, useLanguage } from './language-toggle';
import { PageFrame, SectionLabel } from './site-shell';

const nowLabels = {
  home: { en: 'Home', zh: '首页' },
  now: { en: 'Now', zh: '此刻' },
  reading: { en: 'Reading', zh: '正在阅读' },
  building: { en: 'Building', zh: '正在制作' },
  learning: { en: 'Learning', zh: '正在学习' },
  exploring: { en: 'Exploring', zh: '正在探索' },
};

export function NowPageContent() {
  const { language } = useLanguage();
  const nowItems = [
    [nowLabels.reading, profile.now.reading],
    [nowLabels.building, profile.now.building],
    [nowLabels.learning, profile.now.learning],
    [nowLabels.exploring, profile.now.exploring],
  ] as const;

  return (
    <PageFrame>
      <section className="min-h-[calc(100vh-4rem)] border-b border-deepBlack pb-16 pt-20 dark:border-warmWhite">
        <Link
          className="mb-16 inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.16em] text-deepBlack/55 transition-colors hover:text-deepBlack dark:text-warmWhite/55 dark:hover:text-warmWhite"
          href="/"
        >
          <ArrowLeft size={15} strokeWidth={1.4} />
          {text(nowLabels.home, language)}
        </Link>
        <SectionLabel>{text(nowLabels.now, language)}</SectionLabel>
        <h1 className="mt-8 max-w-5xl font-serif text-[clamp(4.5rem,14vw,14rem)] font-normal leading-[0.82]">
          {text(profile.now.title, language)}
        </h1>
      </section>

      <section className="py-20">
        <div className="border-t border-deepBlack/20 dark:border-warmWhite/20">
          {nowItems.map(([label, value]) => (
            <article
              className="grid gap-8 border-b border-deepBlack/20 py-12 dark:border-warmWhite/20 md:grid-cols-[0.25fr_1fr]"
              key={label.en}
            >
              <p className="text-[0.72rem] uppercase tracking-[0.16em] text-deepBlack/45 dark:text-warmWhite/45">
                {text(label, language)}
              </p>
              <p className="max-w-4xl font-serif text-[clamp(2rem,5vw,5rem)] leading-[1.05]">
                {text(value, language)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}
