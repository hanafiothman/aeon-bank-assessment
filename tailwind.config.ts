import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#b31c8c'
      },
      spacing: {
        '3xs': '0.25rem',
        '2xs': '0.375rem',
        'xs': '0.5rem',
        sm: '0.625rem',
        md: '0.75rem',
        lg: '1rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      },
    },
  },
  plugins: [],
} satisfies Config;
