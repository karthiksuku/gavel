/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gavel': {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#d6e0fd',
          300: '#b3c6fa',
          400: '#8aa4f6',
          500: '#5e7def',
          600: '#3d52e6',
          700: '#2e3fd4',
          800: '#2a35ab',
          900: '#283188',
          950: '#1a1f52',
        },
        'gold': {
          400: '#d4af37',
          500: '#c5a028',
          600: '#9e7b1a',
        }
      },
      fontFamily: {
        'serif': ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      }
    },
  },
  plugins: [],
}
