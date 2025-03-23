/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
          '50': 'color-mix(in srgb, var(--primary) 50%, transparent)',
          '10': 'color-mix(in srgb, var(--primary) 10%, transparent)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          light: 'var(--secondary-light)',
          dark: 'var(--secondary-dark)',
          '50': 'color-mix(in srgb, var(--secondary) 50%, transparent)',
          '10': 'color-mix(in srgb, var(--secondary) 10%, transparent)',
        },
        textColor: 'var(--text)',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.125rem' }],
        'sm': ['0.8125rem', { lineHeight: '1.25rem' }],
        'base': ['0.9375rem', { lineHeight: '1.375rem' }],
        'lg': ['1.0625rem', { lineHeight: '1.5rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['2rem', { lineHeight: '2.5rem' }],
        '4xl': ['2.5rem', { lineHeight: '3rem' }],
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        almarai: ['Almarai', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0',
        wide: '0.02em',
      },
    },
  },
  plugins: [],
};