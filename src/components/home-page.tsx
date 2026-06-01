'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/lib/profile';
import { text, useLanguage } from './language-toggle';
import { PageFrame, SectionLabel } from './site-shell';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const sectionCopy = {
  manifesto: { en: 'Manifesto', zh: '宣言' },
  work: { en: 'Selected Work', zh: '精选作品' },
  workTitle: {
    en: 'Only the work that can hold silence.',
    zh: '只留下那些能承载安静的作品。',
  },
  photography: { en: 'Photography', zh: '摄影' },
  photographyTitle: {
    en: 'Images as atmosphere, memory, and evidence.',
    zh: '影像是气氛、记忆与证据。',
  },
  notes: { en: 'Notes', zh: '札记' },
  notesTitle: {
    en: 'Thoughts for a longer arc.',
    zh: '写给更长时间线的思考。',
  },
  life: { en: 'Life', zh: '生活' },
  lifeTitle: {
    en: 'A life made visible through fragments.',
    zh: '通过片段显影的生活。',
  },
  contact: { en: 'Contact', zh: '联系' },
};

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={fadeUp}
      viewport={{ once: true, margin: '-80px' }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}

function EditorialImage({
  alt,
  className,
  priority = false,
  src,
}: {
  alt: string;
  className: string;
  priority?: boolean;
  src: string;
}) {
  return (
    <Image
      alt={alt}
      className={`object-cover grayscale-[10%] transition duration-[1200ms] ease-editorial hover:grayscale-0 ${className}`}
      height={1600}
      loading={priority ? 'eager' : 'lazy'}
      src={src}
      width={1200}
    />
  );
}

export function HomePage() {
  const { language } = useLanguage();

  return (
    <PageFrame>
      <section className="grid min-h-[calc(100vh-4rem)] grid-cols-1 items-center gap-10 border-b border-deepBlack py-14 dark:border-warmWhite lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
        <Reveal>
          <div className="max-w-4xl">
            <p className="mb-8 text-[0.72rem] uppercase tracking-[0.2em] text-deepBlack/55 dark:text-warmWhite/55">
              {text(profile.hero.eyebrow, language)}
            </p>
            <p className="mb-3 font-serif text-3xl font-normal tracking-[0.08em] text-deepBlack/75 dark:text-warmWhite/75">
              {profile.name.zh}
            </p>
            <h1 className="max-w-[8ch] font-serif text-[clamp(4.3rem,10.5vw,10.8rem)] font-normal leading-[0.86] tracking-normal">
              {profile.name.en}
            </h1>
            <p className="mt-8 text-xl text-deepBlack/80 dark:text-warmWhite/80 md:text-2xl">
              {text(profile.hero.subtitle, language)}
            </p>
            <p className="mt-4 max-w-2xl font-serif text-2xl leading-[1.35] text-deepBlack/55 dark:text-warmWhite/55 md:text-3xl">
              {text(profile.hero.line, language)}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <figure className="ml-auto w-full max-w-[560px]">
            <EditorialImage
              alt={profile.hero.image.alt}
              className="aspect-[4/5] max-h-[72vh] w-full"
              priority
              src={profile.hero.image.src}
            />
          </figure>
        </Reveal>
      </section>

      <section className="grid gap-10 py-28 md:grid-cols-[0.28fr_1fr]" id="manifesto">
        <SectionLabel>{text(sectionCopy.manifesto, language)}</SectionLabel>
        <div className="space-y-10">
          {profile.manifesto.map((line, index) => (
            <Reveal delay={index * 0.06} key={line.en}>
              <p className="max-w-5xl font-serif text-[clamp(2.4rem,7vw,7rem)] leading-[0.98]">
                {text(line, language)}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-deepBlack py-28 dark:border-warmWhite" id="work">
        <div className="mb-16 grid gap-8 md:grid-cols-[0.28fr_1fr]">
          <SectionLabel>{text(sectionCopy.work, language)}</SectionLabel>
          <h2 className="max-w-4xl font-serif text-[clamp(2.7rem,7vw,7rem)] font-normal leading-none">
            {text(sectionCopy.workTitle, language)}
          </h2>
        </div>
        <div className="grid gap-12 lg:grid-cols-3">
          {profile.selectedWork.map((work, index) => (
            <Reveal delay={index * 0.08} key={work.title.en}>
              <article className="group">
                <EditorialImage
                  alt={work.image.alt}
                  className="aspect-[5/6] w-full"
                  src={work.image.src}
                />
                <div className="mt-6 border-t border-deepBlack/20 pt-5 dark:border-warmWhite/20">
                  <h3 className="font-serif text-3xl font-normal">{text(work.title, language)}</h3>
                  <p className="mt-3 leading-7 text-deepBlack/58 dark:text-warmWhite/58">
                    {text(work.description, language)}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-deepBlack py-28 dark:border-warmWhite" id="photography">
        <div className="mb-16 grid gap-8 md:grid-cols-[0.28fr_1fr]">
          <SectionLabel>{text(sectionCopy.photography, language)}</SectionLabel>
          <h2 className="max-w-4xl font-serif text-[clamp(2.7rem,7vw,7rem)] font-normal leading-none">
            {text(sectionCopy.photographyTitle, language)}
          </h2>
        </div>
        <div className="grid gap-10">
          {profile.photography.map((item, index) => (
            <Reveal delay={index * 0.05} key={item.title.en}>
              <figure
                className={
                  index === 1
                    ? 'ml-auto w-full max-w-[760px]'
                    : 'w-full max-w-[1040px]'
                }
              >
                <EditorialImage
                  alt={item.image.alt}
                  className={index === 1 ? 'aspect-[4/5] w-full' : 'aspect-[16/9] w-full'}
                  src={item.image.src}
                />
                <figcaption className="mt-4 text-[0.72rem] uppercase tracking-[0.16em] text-deepBlack/45 dark:text-warmWhite/45">
                  {text(item.title, language)}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grid gap-12 border-t border-deepBlack py-28 dark:border-warmWhite lg:grid-cols-2" id="notes">
        <div>
          <SectionLabel>{text(sectionCopy.notes, language)}</SectionLabel>
          <h2 className="mt-8 max-w-xl font-serif text-[clamp(3rem,8vw,8rem)] font-normal leading-none">
            {text(sectionCopy.notesTitle, language)}
          </h2>
        </div>
        <div className="border-t border-deepBlack/20 dark:border-warmWhite/20">
          {profile.notes.map((note) => (
            <Reveal key={note.title.en}>
              <article className="grid gap-5 border-b border-deepBlack/20 py-8 dark:border-warmWhite/20 md:grid-cols-[0.25fr_1fr]">
                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-deepBlack/45 dark:text-warmWhite/45">
                  {text(note.theme, language)}
                </p>
                <h3 className="font-serif text-3xl font-normal leading-tight">
                  {text(note.title, language)}
                </h3>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-deepBlack py-28 dark:border-warmWhite">
        <div className="mb-16 grid gap-8 md:grid-cols-[0.28fr_1fr]">
          <SectionLabel>{text(sectionCopy.life, language)}</SectionLabel>
          <h2 className="max-w-4xl font-serif text-[clamp(2.7rem,7vw,7rem)] font-normal leading-none">
            {text(sectionCopy.lifeTitle, language)}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {profile.life.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal delay={index * 0.04} key={item.label.en}>
                <article className="relative overflow-hidden">
                  <Image
                    alt=""
                    className="aspect-[4/5] w-full object-cover opacity-80 grayscale-[18%] transition duration-[1200ms] ease-editorial hover:opacity-100 hover:grayscale-0"
                    height={1200}
                    src={item.image}
                    width={900}
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-warmWhite/82 p-5 text-deepBlack backdrop-blur-md dark:bg-deepBlack/72 dark:text-warmWhite">
                    <span className="font-serif text-2xl">{text(item.label, language)}</span>
                    <Icon size={18} strokeWidth={1.4} />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-t border-deepBlack py-28 dark:border-warmWhite" id="contact">
        <div className="grid gap-10 md:grid-cols-[0.28fr_1fr]">
          <SectionLabel>{text(sectionCopy.contact, language)}</SectionLabel>
          <div>
            <h2 className="max-w-4xl font-serif text-[clamp(3.2rem,9vw,9rem)] font-normal leading-none">
              {text(profile.contact.line, language)}
            </h2>
            <nav className="mt-16 grid border-t border-deepBlack/20 dark:border-warmWhite/20 sm:grid-cols-2 lg:grid-cols-4">
              {profile.contact.links.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    className="grid min-h-24 grid-cols-[20px_1fr_18px] items-center gap-4 border-b border-deepBlack/20 px-4 text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-500 ease-editorial hover:bg-deepBlack hover:text-warmWhite dark:border-warmWhite/20 dark:hover:bg-warmWhite dark:hover:text-deepBlack"
                    href={link.href}
                    key={link.label.en}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon size={17} strokeWidth={1.4} />
                    <span>{text(link.label, language)}</span>
                    <ArrowUpRight size={15} strokeWidth={1.4} />
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
