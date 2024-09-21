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
      1: '#1B1F33',  // Darker grey-blue background
      2: '#161A29',  // Slightly lighter background
      3: '#2B2F47',  // Darker elements, like card background
      4: '#1A223E',  // A deep blue accent for buttons or highlights
      background: '#10101A',  // Main dark background
      text: '#D1D1E9',  // Softer light text color
      card: '#24283B',  // Card background (slightly lighter)
      border: '#3C3F52',  // Grey for borders and dividers
    },
    blue: {
      1: '#0A74DA',  // Brighter blue for primary elements
      primary: '#1D4ED8',  // Main blue shade for dark theme
    },
    sky: {
      1: '#A4C8FF',  // Softer sky blue for highlights
      2: '#D6E4FF',  // Very light blue for backgrounds
      3: '#EAF3FF',  // Lightest blue for extra highlights
    },
    orange: {
      1: '#FF6B35',  // Bright orange for accents and warnings
    },
    purple: {
      1: '#A259FF',  // Vibrant purple for a stylish look
    },
    yellow: {
      1: '#F2C94C',  // Warm yellow for attention-grabbing elements
      accent: '#F2994A',  // Orange-yellow for dark theme accents
    },
    light: {
      background: '#F9FAFB',  // Very light grey background
      text: '#202124',  // Dark text for readability
      primary: '#3B82F6',  // Bright blue for buttons and accents
      secondary: '#10B981',  // Green for secondary elements
      accent: '#F59E0B',  // Orange accent for highlights
      border: '#E5E7EB',  // Light grey for borders
      card: '#FFFFFF',  // Pure white for card backgrounds
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
