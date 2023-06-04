const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: '[data-theme="dark"]',
  theme: {
    extend: {
      colors: {
        ink: `var(--c-ink)`,
        paper: `var(--c-paper)`,
      },
      fontFamily: {
        title: ['var(--font-mmd)', ...fontFamily.mono],
        sans: ['var(--font-inter)', ...fontFamily.sans],
        mono: ['var(--font-sm)', ...fontFamily.mono],
      },
    },
  },
  plugins: [],
}
