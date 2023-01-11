/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/icons/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"FiraCode"', 'monospace'],
      },
      colors: {
        theme: {
          bg: '#282a36',
          sidebar: '#1E1F29',
          divider: '#242530',
          input: '#1E1F29',
        },
        accent: {
          blue: '#5394ec',
          cyan: '#299999',
          green: '#379c1a',
          magenta: '#ae8abe',
          red: '#e74644',
          yellow: '#dcc457',
        },
      },
    },
  },
  plugins: [],
};
