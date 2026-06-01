'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { sitePath } from '@/lib/paths';
import { profile } from '@/lib/profile';
import { text, useLanguage } from './language-toggle';
import { PageFrame, SectionLabel } from './site-shell';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const atlasMarks = [
  { left: '11%', top: '18%', delay: '-3s', length: '94px', rotate: '18deg' },
  { left: '28%', top: '72%', delay: '-11s', length: '132px', rotate: '-12deg' },
  { left: '48%', top: '32%', delay: '-7s', length: '86px', rotate: '42deg' },
  { left: '66%', top: '80%', delay: '-16s', length: '116px', rotate: '-28deg' },
  { left: '84%', top: '22%', delay: '-9s', length: '104px', rotate: '9deg' },
  { left: '74%', top: '56%', delay: '-19s', length: '148px', rotate: '61deg' },
];

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

function QuietAtlasEnvironment() {
  const lensX = useMotionValue(-280);
  const lensY = useMotionValue(-280);
  const smoothX = useSpring(lensX, { damping: 34, stiffness: 118, mass: 0.4 });
  const smoothY = useSpring(lensY, { damping: 34, stiffness: 118, mass: 0.4 });

  useEffect(() => {
    const updateLens = (event: PointerEvent) => {
      lensX.set(event.clientX - 280);
      lensY.set(event.clientY - 280);
    };

    window.addEventListener('pointermove', updateLens, { passive: true });
    return () => window.removeEventListener('pointermove', updateLens);
  }, [lensX, lensY]);

  return (
    <div aria-hidden="true" className="quiet-atlas">
      <div className="atlas-light" />
      <div className="atlas-paper" />
      <motion.div className="atlas-lens" style={{ x: smoothX, y: smoothY }} />
      <div className="atlas-line-field">
        {atlasMarks.map((mark) => (
          <span
            className="atlas-line"
            key={`${mark.left}-${mark.top}`}
            style={
              {
                '--atlas-delay': mark.delay,
                '--atlas-length': mark.length,
                '--atlas-rotate': mark.rotate,
                left: mark.left,
                top: mark.top,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

function ExhibitionEntrance() {
  return (
    <motion.div
      aria-hidden="true"
      className="exhibition-entrance"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: '-100%' }}
      transition={{ delay: 0.12, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    />
  );
}

function ScrollTrace() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { damping: 30, stiffness: 120 });

  return (
    <div aria-hidden="true" className="scroll-trace">
      <motion.span style={{ scaleY }} />
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={fadeUp}
      viewport={{ once: true, margin: '-80px' }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}

function ParallaxFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.025, 1, 1.025]);

  return (
    <div className="artifact-media" ref={ref}>
      <motion.div className="h-full" style={{ scale, y }}>
        {children}
      </motion.div>
    </div>
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
    <ParallaxFrame>
      <Image
        alt={alt}
        className={`object-cover grayscale-[10%] transition duration-[1200ms] ease-editorial hover:grayscale-0 ${className}`}
        height={1600}
        loading={priority ? 'eager' : 'lazy'}
        src={sitePath(src)}
        width={1200}
      />
    </ParallaxFrame>
  );
}

function MagneticAnchor({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className: string;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 18, stiffness: 180 });
  const smoothY = useSpring(y, { damping: 18, stiffness: 180 });

  return (
    <motion.a
      className={className}
      href={href}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onMouseMove={(event) => {
        const bounds = ref.current?.getBoundingClientRect();
        if (!bounds) {
          return;
        }

        x.set((event.clientX - bounds.left - bounds.width / 2) * 0.12);
        y.set((event.clientY - bounds.top - bounds.height / 2) * 0.18);
      }}
      ref={ref}
      rel="noreferrer"
      style={{ x: smoothX, y: smoothY }}
      target="_blank"
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.a>
  );
}

export function HomePage() {
  const { language } = useLanguage();

  return (
    <PageFrame>
      <ExhibitionEntrance />
      <QuietAtlasEnvironment />
      <ScrollTrace />
      <section className="exhibition-room cover-room grid min-h-[calc(100vh-4rem)] grid-cols-1 items-center gap-10 border-b border-deepBlack py-14 dark:border-warmWhite lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
        <Reveal>
          <div className="identity-wall max-w-4xl">
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
          <figure className="hero-artifact ml-auto w-full max-w-[560px]">
            <EditorialImage
              alt={profile.hero.image.alt}
              className="aspect-[4/5] max-h-[72vh] w-full"
              priority
              src={profile.hero.image.src}
            />
          </figure>
        </Reveal>
      </section>

      <section className="exhibition-room manifesto-room grid gap-10 py-28 md:grid-cols-[0.28fr_1fr]" id="manifesto">
        <SectionLabel>{text(sectionCopy.manifesto, language)}</SectionLabel>
        <div className="space-y-10">
          {profile.manifesto.map((line, index) => (
            <Reveal delay={index * 0.06} key={line.en}>
              <p className="manifesto-line max-w-5xl font-serif text-[clamp(2.4rem,7vw,7rem)] leading-[0.98]">
                {text(line, language)}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="exhibition-room artifact-room border-t border-deepBlack py-28 dark:border-warmWhite" id="work">
        <div className="mb-16 grid gap-8 md:grid-cols-[0.28fr_1fr]">
          <SectionLabel>{text(sectionCopy.work, language)}</SectionLabel>
          <h2 className="max-w-4xl font-serif text-[clamp(2.7rem,7vw,7rem)] font-normal leading-none">
            {text(sectionCopy.workTitle, language)}
          </h2>
        </div>
        <div className="grid gap-12 lg:grid-cols-3">
          {profile.selectedWork.map((work, index) => (
            <Reveal delay={index * 0.08} key={work.title.en}>
              <article className="artifact-card group">
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

      <section className="exhibition-room field-room border-t border-deepBlack py-28 dark:border-warmWhite" id="photography">
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

      <section className="exhibition-room notes-room grid gap-12 border-t border-deepBlack py-28 dark:border-warmWhite lg:grid-cols-2" id="notes">
        <div>
          <SectionLabel>{text(sectionCopy.notes, language)}</SectionLabel>
          <h2 className="mt-8 max-w-xl font-serif text-[clamp(3rem,8vw,8rem)] font-normal leading-none">
            {text(sectionCopy.notesTitle, language)}
          </h2>
        </div>
        <div className="border-t border-deepBlack/20 dark:border-warmWhite/20">
          {profile.notes.map((note) => (
            <Reveal key={note.title.en}>
              <article className="note-index grid gap-5 border-b border-deepBlack/20 py-8 dark:border-warmWhite/20 md:grid-cols-[0.25fr_1fr]">
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

      <section className="exhibition-room life-room border-t border-deepBlack py-28 dark:border-warmWhite">
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
                <article className="life-fragment relative overflow-hidden">
                  <Image
                    alt=""
                    className="aspect-[4/5] w-full object-cover opacity-80 grayscale-[18%] transition duration-[1200ms] ease-editorial hover:opacity-100 hover:grayscale-0"
                    height={1200}
                    src={sitePath(item.image)}
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

      <section className="exhibition-room contact-room border-t border-deepBlack py-28 dark:border-warmWhite" id="contact">
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
                  <MagneticAnchor
                    className="grid min-h-24 grid-cols-[20px_1fr_18px] items-center gap-4 border-b border-deepBlack/20 px-4 text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-500 ease-editorial hover:bg-deepBlack hover:text-warmWhite dark:border-warmWhite/20 dark:hover:bg-warmWhite dark:hover:text-deepBlack"
                    href={link.href}
                    key={link.label.en}
                  >
                    <Icon size={17} strokeWidth={1.4} />
                    <span>{text(link.label, language)}</span>
                    <ArrowUpRight size={15} strokeWidth={1.4} />
                  </MagneticAnchor>
                );
              })}
            </nav>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
