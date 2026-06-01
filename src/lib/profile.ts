import {
  Aperture,
  BookOpen,
  Dumbbell,
  Film,
  Github,
  Instagram,
  Mail,
  Map,
  PenLine,
  Youtube,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Visual = {
  src: string;
  alt: string;
};

export type LinkItem = {
  label: LocalizedText;
  href: string;
  icon: LucideIcon;
};

export type Language = 'en' | 'zh';

export type LocalizedText = {
  en: string;
  zh: string;
};

export const profile = {
  site: {
    title: 'Rory syhran | Personal Brand',
    description:
      'The personal brand website of 王俞蘅 / Rory syhran: creator, builder, storyteller.',
    url: 'https://example.com',
  },
  name: {
    zh: '王俞蘅',
    en: 'Rory syhran',
  },
  hero: {
    eyebrow: {
      en: 'Personal Brand Website',
      zh: '个人品牌主页',
    },
    subtitle: {
      en: 'Creator · Builder · Storyteller',
      zh: '创作者 · 建造者 · 叙事者',
    },
    line: {
      en: 'Building products, stories and experiences.',
      zh: '创造产品、故事与有温度的体验。',
    },
    image: {
      src: '/magazine-cover.jpg',
      alt: 'Editorial photograph of a quiet interior with linen, camera, notebook, and sea light',
    },
  },
  manifesto: [
    {
      en: 'I believe technology should feel human.',
      zh: '我相信技术应该保有人味。',
    },
    {
      en: 'I believe stories shape reality.',
      zh: '我相信故事会塑造现实。',
    },
    {
      en: 'I create things that make people feel something.',
      zh: '我创造能让人产生感受的东西。',
    },
  ],
  selectedWork: [
    {
      title: {
        en: 'Human Tools',
        zh: '有温度的工具',
      },
      description: {
        en: 'Products shaped around attention, emotion, and everyday usefulness.',
        zh: '围绕注意力、情绪与日常可用性塑造的产品。',
      },
      image: {
        src: '/still-life.jpg',
        alt: 'Notebook, books, pen, ceramic cup, and paper map on a stone table',
      },
    },
    {
      title: {
        en: 'Quiet Systems',
        zh: '安静的系统',
      },
      description: {
        en: 'Small systems for learning, creating, and becoming more deliberate.',
        zh: '帮助学习、创作与更有意识地生活的小系统。',
      },
      image: {
        src: '/light-texture.jpg',
        alt: 'Soft sunlight through linen and leaf shadows on plaster',
      },
    },
    {
      title: {
        en: 'Field Notes',
        zh: '行走笔记',
      },
      description: {
        en: 'Travel, images, and fragments collected as a personal archive.',
        zh: '把旅行、影像和片段收集成一份个人档案。',
      },
      image: {
        src: '/travel-light.jpg',
        alt: 'A quiet old coastal street with warm stone walls and sea light',
      },
    },
  ],
  photography: [
    {
      title: {
        en: 'Coastal Light',
        zh: '海岸光线',
      },
      image: {
        src: '/travel-light.jpg',
        alt: 'A cinematic coastal passage framed by stone buildings',
      },
    },
    {
      title: {
        en: 'Window Study',
        zh: '窗边习作',
      },
      image: {
        src: '/magazine-cover.jpg',
        alt: 'Linen curtain, notebook, camera, and soft coastal light',
      },
    },
    {
      title: {
        en: 'Soft Evidence',
        zh: '柔软证据',
      },
      image: {
        src: '/light-texture.jpg',
        alt: 'Linen, plaster texture, and organic shadows',
      },
    },
  ],
  notes: [
    {
      title: {
        en: 'AI as an Instrument of Taste',
        zh: '作为审美工具的 AI',
      },
      theme: {
        en: 'AI',
        zh: 'AI',
      },
    },
    {
      title: {
        en: 'The Discipline of Becoming',
        zh: '成为自己的纪律',
      },
      theme: {
        en: 'Growth',
        zh: '成长',
      },
    },
    {
      title: {
        en: 'Cities Remember Through Light',
        zh: '城市通过光记忆',
      },
      theme: {
        en: 'Travel',
        zh: '旅行',
      },
    },
  ],
  life: [
    {
      label: {
        en: 'Photography',
        zh: '摄影',
      },
      icon: Aperture,
      image: '/magazine-cover.jpg',
    },
    {
      label: {
        en: 'Travel',
        zh: '旅行',
      },
      icon: Map,
      image: '/travel-light.jpg',
    },
    {
      label: {
        en: 'Reading',
        zh: '阅读',
      },
      icon: BookOpen,
      image: '/still-life.jpg',
    },
    {
      label: {
        en: 'Fitness',
        zh: '健身',
      },
      icon: Dumbbell,
      image: '/light-texture.jpg',
    },
    {
      label: {
        en: 'Films',
        zh: '电影',
      },
      icon: Film,
      image: '/travel-light.jpg',
    },
    {
      label: {
        en: 'Creativity',
        zh: '创造力',
      },
      icon: PenLine,
      image: '/still-life.jpg',
    },
  ],
  now: {
    title: {
      en: 'What is alive now.',
      zh: '此刻正在发生的事。',
    },
    reading: {
      en: 'Independent magazines, product essays, and books about attention.',
      zh: '独立杂志、产品随笔，以及关于注意力的书。',
    },
    building: {
      en: 'A personal digital home with a long life and a quiet point of view.',
      zh: '一个有长期生命力、带着安静观点的个人数字空间。',
    },
    learning: {
      en: 'How AI, storytelling, and design can become more human.',
      zh: '学习如何让 AI、叙事和设计变得更有人味。',
    },
    exploring: {
      en: 'Travel, photography, film language, fitness, and better daily systems.',
      zh: '探索旅行、摄影、电影语言、健身和更好的日常系统。',
    },
  },
  contact: {
    line: {
      en: "Let's build something meaningful.",
      zh: '一起创造一些真正有意义的东西。',
    },
    links: [
      {
        label: {
          en: 'Email',
          zh: '邮件',
        },
        href: 'mailto:hello@example.com',
        icon: Mail,
      },
      {
        label: {
          en: 'Instagram',
          zh: 'Instagram',
        },
        href: 'https://instagram.com/yourname',
        icon: Instagram,
      },
      {
        label: {
          en: 'YouTube',
          zh: 'YouTube',
        },
        href: 'https://youtube.com/@yourname',
        icon: Youtube,
      },
      {
        label: {
          en: 'GitHub',
          zh: 'GitHub',
        },
        href: 'https://github.com/yourname',
        icon: Github,
      },
    ] satisfies LinkItem[],
  },
};
