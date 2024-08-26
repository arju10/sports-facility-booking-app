/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF4C4C',
        secondary: '#FFB22C',
        accent: '#FFDE4D',
        background: '#F3FEB8',
        'secondary-dark': '#e0a829',
      },
    },
  },
  plugins: [require('daisyui')],
};
