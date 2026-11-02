/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './data/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1F3A5F',
          50: '#F2F5F9',
          100: '#E1E8F1',
          200: '#C3D1E3',
          300: '#97AECB',
          400: '#5F82AC',
          500: '#2E6DB4',
          600: '#274F86',
          700: '#1F3A5F',
          800: '#172B47',
          900: '#0F1D30',
          950: '#0A1422',
        },
        accent: {
          DEFAULT: '#2E6DB4',
          light: '#7FA8DC',
        },
        ink: {
          DEFAULT: '#111827',
          muted: '#4B5563',
          soft: '#6B7280',
        },
        paper: {
          DEFAULT: '#FBFBFA',
          raised: '#FFFFFF',
          dark: '#0C1220',
          'dark-raised': '#111A2C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      fontSize: {
        '2xs': ['0.7rem', { lineHeight: '1rem' }],
      },
      maxWidth: {
        prose: '68ch',
        site: '72rem',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.ink.muted'),
            '--tw-prose-headings': theme('colors.ink.DEFAULT'),
            '--tw-prose-links': theme('colors.accent.DEFAULT'),
            '--tw-prose-bold': theme('colors.ink.DEFAULT'),
            '--tw-prose-invert-body': '#C7CFDB',
            '--tw-prose-invert-headings': '#F3F4F6',
            '--tw-prose-invert-links': theme('colors.accent.light'),
            '--tw-prose-invert-bold': '#F3F4F6',
            maxWidth: 'none',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
