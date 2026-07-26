/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
      },
      colors: {
        pastel: {
          yellow: '#FEF08A',
          yellowLight: '#FEF9C3',
          yellowDark: '#EAB308',
          pink: '#FBCFE8',
          pinkLight: '#FCE7F3',
          pinkDark: '#EC4899',
          purple: '#DDD6FE',
          purpleLight: '#F3E8FF',
          purpleDark: '#A855F7',
          blue: '#BAE6FD',
          blueLight: '#E0F2FE',
          blueDark: '#0284C7',
          green: '#BBF7D0',
          greenLight: '#DCFCE7',
          greenDark: '#16A34A',
          orange: '#FFEDD5',
          orangeLight: '#FFF7ED',
          orangeDark: '#F97316',
          peach: '#FFE4E6',
          bg: '#FFFBF7',
          card: '#FFFFFF',
        }
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'soft-hover': '0 12px 35px rgba(0, 0, 0, 0.08)',
        'pastel': '0 10px 25px -5px rgba(186, 230, 253, 0.4)',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
