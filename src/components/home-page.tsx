'use client';

import {
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import {
  motion,
  useMotionTemplate,
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

function DigitalInstallation() {
  const lensX = useMotionValue(0);
  const lensY = useMotionValue(0);
  const depthX = useMotionValue(0);
  const depthY = useMotionValue(0);
  const smoothLensX = useSpring(lensX, { damping: 30, stiffness: 105, mass: 0.45 });
  const smoothLensY = useSpring(lensY, { damping: 30, stiffness: 105, mass: 0.45 });
  const smoothDepthX = useSpring(depthX, { damping: 36, stiffness: 95, mass: 0.55 });
  const smoothDepthY = useSpring(depthY, { damping: 36, stiffness: 95, mass: 0.55 });

  const mapX = useTransform(smoothDepthX, [-1, 1], [42, -42]);
  const mapY = useTransform(smoothDepthY, [-1, 1], [26, -26]);
  const mapRotate = useTransform(smoothDepthX, [-1, 1], [-2.5, 2.5]);
  const slitX = useTransform(smoothDepthX, [-1, 1], [-84, 84]);
  const slitY = useTransform(smoothDepthY, [-1, 1], [36, -36]);
  const slitRotate = useTransform(smoothDepthX, [-1, 1], [-5, 5]);
  const planeX = useTransform(smoothDepthX, [-1, 1], [-26, 26]);
  const planeY = useTransform(smoothDepthY, [-1, 1], [-18, 18]);
  const planeRotateY = useTransform(smoothDepthX, [-1, 1], [10, -10]);
  const planeRotateX = useTransform(smoothDepthY, [-1, 1], [-8, 8]);
  const lensBackground = useMotionTemplate`radial-gradient(circle at ${smoothLensX}px ${smoothLensY}px, rgb(255 255 255 / 0.48), rgb(226 214 194 / 0.16) 31%, transparent 66%)`;

  useEffect(() => {
    const centerField = () => {
      lensX.set(window.innerWidth / 2);
      lensY.set(window.innerHeight / 2);
      depthX.set(0);
      depthY.set(0);
    };

    const updateField = (event: PointerEvent) => {
      const nextX = (event.clientX / window.innerWidth - 0.5) * 2;
      const nextY = (event.clientY / window.innerHeight - 0.5) * 2;

      lensX.set(event.clientX);
      lensY.set(event.clientY);
      depthX.set(Math.max(-1, Math.min(1, nextX)));
      depthY.set(Math.max(-1, Math.min(1, nextY)));
    };

    centerField();
    window.addEventListener('resize', centerField, { passive: true });
    window.addEventListener('pointermove', updateField, { passive: true });

    return () => {
      window.removeEventListener('resize', centerField);
      window.removeEventListener('pointermove', updateField);
    };
  }, [depthX, depthY, lensX, lensY]);

  return (
    <div aria-hidden="true" className="digital-installation">
      <motion.div className="installation-fog installation-fog-back" />
      <motion.div className="installation-fog installation-fog-near" />
      <motion.div className="installation-grid" />
      <motion.svg
        className="installation-map"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1200 760"
      >
        <motion.g style={{ rotateZ: mapRotate, transformOrigin: 'center', x: mapX, y: mapY }}>
          <path d="M58 172 C 244 98, 352 285, 512 226 S 790 38, 1120 124" />
          <path d="M126 612 C 286 510, 360 692, 526 574 S 826 392, 1086 520" />
          <path d="M272 118 L 454 286 L 702 236 L 934 390 L 1114 328" />
          <path d="M156 356 L 390 404 L 556 318 L 822 462 L 1050 430" />
          <circle cx="272" cy="118" r="5" />
          <circle cx="454" cy="286" r="4" />
          <circle cx="702" cy="236" r="5" />
          <circle cx="934" cy="390" r="4" />
          <circle cx="390" cy="404" r="4" />
          <circle cx="822" cy="462" r="5" />
        </motion.g>
      </motion.svg>
      <motion.div
        className="installation-slit"
        style={{ rotateZ: slitRotate, x: slitX, y: slitY }}
      />
      <motion.div
        className="installation-planes"
      >
        <motion.span
          className="installation-plane installation-plane-a"
          style={{ rotateX: planeRotateX, rotateY: planeRotateY, x: planeX, y: planeY }}
        />
        <motion.span
          className="installation-plane installation-plane-b"
          style={{ rotateX: planeRotateX, rotateY: planeRotateY, x: planeX, y: planeY }}
        />
        <motion.span
          className="installation-plane installation-plane-c"
          style={{ rotateX: planeRotateX, rotateY: planeRotateY, x: planeX, y: planeY }}
        />
      </motion.div>
      <motion.div className="installation-lens" style={{ background: lensBackground }} />
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

function CinematicHeroBackdrop({ language }: { language: ReturnType<typeof useLanguage>['language'] }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { damping: 34, stiffness: 92, mass: 0.5 });
  const smoothY = useSpring(pointerY, { damping: 34, stiffness: 92, mass: 0.5 });
  const portalX = useTransform(smoothX, [-1, 1], [-22, 22]);
  const portalY = useTransform(smoothY, [-1, 1], [-15, 15]);
  const portalRotateX = useTransform(smoothY, [-1, 1], [3, -3]);
  const portalRotateY = useTransform(smoothX, [-1, 1], [-4, 4]);
  const imageX = useTransform(smoothX, [-1, 1], [20, -20]);
  const imageY = useTransform(smoothY, [-1, 1], [13, -13]);
  const shardX = useTransform(smoothX, [-1, 1], [-34, 34]);
  const shardY = useTransform(smoothY, [-1, 1], [18, -18]);
  const haloX = useTransform(smoothX, [-1, 1], [38, -38]);
  const haloY = useTransform(smoothY, [-1, 1], [24, -24]);

  useEffect(() => {
    const reset = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    const move = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };

    reset();
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('resize', reset, { passive: true });

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('resize', reset);
    };
  }, [pointerX, pointerY]);

  const indexItems = [
    text(profile.hero.eyebrow, language),
    text(profile.hero.subtitle, language),
    text(profile.selectedWork[2].title, language),
    text(profile.life[0].label, language),
  ];

  return (
    <div aria-hidden="true" className="cinematic-hero-backdrop">
      <motion.div className="cinematic-hero-halo" style={{ x: haloX, y: haloY }} />
      <motion.div
        className="cinematic-hero-portal"
        style={{
          rotateX: portalRotateX,
          rotateY: portalRotateY,
          x: portalX,
          y: portalY,
        }}
      >
        <motion.div className="cinematic-hero-image" style={{ x: imageX, y: imageY }}>
          <Image
            alt=""
            className="h-full w-full object-cover"
            height={1200}
            priority
            src={sitePath(profile.hero.cinematicImage.src)}
            width={2000}
          />
        </motion.div>
        <span className="cinematic-glass-edge cinematic-glass-edge-top" />
        <span className="cinematic-glass-edge cinematic-glass-edge-bottom" />
      </motion.div>
      <motion.span className="cinematic-shard cinematic-shard-a" style={{ x: shardX, y: shardY }} />
      <motion.span className="cinematic-shard cinematic-shard-b" style={{ x: haloX, y: shardY }} />
      <div className="cinematic-hero-index">
        {indexItems.map((item, index) => (
          <span key={`${item}-${index}`}>
            {String(index + 1).padStart(2, '0')} / {item}
          </span>
        ))}
      </div>
      <div className="cinematic-hero-chapter">
        <span>{text(profile.name, language)}</span>
        <span>{text(profile.hero.line, language)}</span>
      </div>
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

function HeroReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      animate="visible"
      initial="hidden"
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={fadeUp}
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

function useMagneticSurface<T extends HTMLElement>(strength = 18, tilt = 6) {
  const ref = useRef<T>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 20, stiffness: 170 });
  const smoothY = useSpring(y, { damping: 20, stiffness: 170 });
  const smoothRotateX = useSpring(rotateX, { damping: 22, stiffness: 150 });
  const smoothRotateY = useSpring(rotateY, { damping: 22, stiffness: 150 });

  function reset() {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  }

  function move(event: ReactPointerEvent<T>) {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) {
      return;
    }

    const localX = (event.clientX - bounds.left) / bounds.width;
    const localY = (event.clientY - bounds.top) / bounds.height;
    const centeredX = localX - 0.5;
    const centeredY = localY - 0.5;

    ref.current?.style.setProperty('--spot-x', `${localX * 100}%`);
    ref.current?.style.setProperty('--spot-y', `${localY * 100}%`);
    x.set(centeredX * strength);
    y.set(centeredY * strength);
    rotateX.set(centeredY * -tilt);
    rotateY.set(centeredX * tilt);
  }

  return {
    onPointerLeave: reset,
    onPointerMove: move,
    ref,
    style: {
      rotateX: smoothRotateX,
      rotateY: smoothRotateY,
      transformPerspective: 1200,
      x: smoothX,
      y: smoothY,
    },
  };
}

function SpatialBlock({
  children,
  className,
  strength = 12,
  tilt = 4,
}: {
  children: ReactNode;
  className: string;
  strength?: number;
  tilt?: number;
}) {
  const magnetic = useMagneticSurface<HTMLDivElement>(strength, tilt);

  return (
    <motion.div
      className={`magnetic-surface spatial-copy ${className}`}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.006 }}
      {...magnetic}
    >
      {children}
    </motion.div>
  );
}

function SpatialFigure({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const magnetic = useMagneticSurface<HTMLElement>(18, 5);

  return (
    <motion.figure
      className={`magnetic-surface ${className}`}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.012 }}
      {...magnetic}
    >
      {children}
    </motion.figure>
  );
}

function MagneticArticle({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const magnetic = useMagneticSurface<HTMLElement>(16, 4.5);

  return (
    <motion.article
      className={`magnetic-surface ${className}`}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.012 }}
      {...magnetic}
    >
      {children}
    </motion.article>
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
  const magnetic = useMagneticSurface<HTMLAnchorElement>(12, 3.5);

  return (
    <motion.a
      className={`magnetic-surface magnetic-link ${className}`}
      href={href}
      rel="noreferrer"
      {...magnetic}
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
      <DigitalInstallation />
      <ScrollTrace />
      <section className="exhibition-room cover-room grid min-h-[calc(100vh-4rem)] grid-cols-1 items-center gap-10 border-b border-deepBlack py-14 dark:border-warmWhite lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
        <CinematicHeroBackdrop language={language} />
        <HeroReveal>
          <SpatialBlock className="identity-wall max-w-4xl">
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
          </SpatialBlock>
        </HeroReveal>

        <HeroReveal delay={0.12}>
          <SpatialFigure className="hero-artifact ml-auto w-full max-w-[560px]">
            <EditorialImage
              alt={profile.hero.image.alt}
              className="aspect-[4/5] max-h-[72vh] w-full"
              priority
              src={profile.hero.image.src}
            />
          </SpatialFigure>
        </HeroReveal>
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
              <MagneticArticle className="artifact-card group">
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
              </MagneticArticle>
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
                <MagneticArticle className="life-fragment relative overflow-hidden">
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
                </MagneticArticle>
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
