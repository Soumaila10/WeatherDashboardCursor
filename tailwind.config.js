/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        'glass-light': 'rgba(255,255,255,0.08)',
        'glass-dark': 'rgba(15,23,42,0.7)',
      },
      boxShadow: {
        glass: '0 18px 45px rgba(15,23,42,0.7)',
      },
    },
  },
  plugins: [],
};


