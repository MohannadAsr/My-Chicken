/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',

  theme: {
    container: {
      center: true,
    },

    extend: {
      colors: {
        primary: '#e30513',
        secondary: '#F67B25',
        success: '#4BB543',
        third: '#FA7147',
        light: '#fff',
        warning: '#f0ad4e',
      },
      fontSize: {
        '20xl': '7rem',
      },
      container: {
        center: true,

        screens: {
          xl: '1240px',
        },
      },
    },
  },
  plugins: [],
};
