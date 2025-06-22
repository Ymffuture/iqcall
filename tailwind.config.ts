import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Dark base theme
        dark: {
          1: '#1E1E2E',
          2: '#14161A',
          3: '#2D2F4D',
          4: '#1E2757',
        },

        // Brand Colors
        facebook: {
          DEFAULT: '#1877F2',
          dark: '#145DBF',
        },
        google: {
          red: '#EA4335',
          green: '#34A853',
          yellow: '#FBBC05',
          blue: '#4285F4',
        },
        tesla: {
          red: '#E31937',
          dark: '#171A20',
          silver: '#C0C0C0',
        },
        discord: {
          DEFAULT: '#5865F2',
          dark: '#404EED',
          blurple: '#7289DA',
        },

        // Legacy / Accent Colors
        blue: {
          1: '#007BFF',
        },
        sky: {
          1: '#A6C8FF',
          2: '#E0F4FF',
          3: '#F7FCFF',
        },
        orange: {
          1: '#FF6B30',
        },
        purple: {
          1: '#6F42C1',
        },
        yellow: {
          1: '#FFC107',
        },
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },

      backgroundImage: {
        hero: "url('/images/hero-background.png')",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;

