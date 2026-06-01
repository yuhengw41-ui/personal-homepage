import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        warmWhite: '#FAFAF8',
        deepBlack: '#111111',
        softGray: '#8B8B8B',
        warmBeige: '#E9E0D2',
        softBrown: '#8A7666',
      },
      fontFamily: {
        sans: [
          'Inter',
          'Helvetica Neue',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'sans-serif',
        ],
        serif: [
          'Bodoni 72',
          'Didot',
          'Baskerville',
          'Libre Baskerville',
          'Georgia',
          'Songti SC',
          'STSong',
          'serif',
        ],
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
