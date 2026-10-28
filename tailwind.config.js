/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FDFBF6',
        cream: '#F5F0E6',
        sand: '#EAE2D0',
        forest: {
          DEFAULT: '#0F3D2E',
          light: '#1B5C46',
          dark: '#0A2A20',
        },
        gold: {
          DEFAULT: '#C6A15B',
          light: '#E3C88F',
        },
      },
      fontFamily: {
        display: ['Georgia', '"Times New Roman"', 'serif'],
        sans: ['"Segoe UI"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 61, 46, 0.08)',
      },
    },
  },
  plugins: [],
}
