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
    dark: {
      1: '#1E1E2E', // A slightly lighter dark
      2: '#14161A', // Darker variant for depth
      3: '#2D2F4D', // Softer dark blue
      4: '#1E2757', // Rich navy
    },
    blue: {
      1: '#007BFF', // Brighter blue for better contrast
    },
    sky: {
      1: '#A6C8FF', // Soft sky blue
      2: '#E0F4FF', // Very light blue
      3: '#F7FCFF', // Almost white for highlights
    },
    orange: {
      1: '#FF6B30', // A vibrant orange
    },
    purple: {
      1: '#6F42C1', // Muted purple for elegance
    },
    yellow: {
      1: '#FFC107', // A brighter, more vibrant yellow
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
