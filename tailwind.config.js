/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/icons/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nightowl: {
          bg: '#011627',
          sidebar: '#01101D',
          divider: '#00060E',
        },
      },
    },
  },
  plugins: [],
};
