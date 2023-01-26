/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/icons/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /accent-(rose|orange|yellow|emerald|cyan|blue|violet|fuchsia)/,
      variants: ['prose-headings', 'hover'],
    },
    {
      pattern: /prose-(rose|orange|yellow|emerald|cyan|blue|violet|fuchsia)/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"FiraCode"', 'monospace'],
      },
      colors: {
        theme: {
          bg: '#282a36',
          sidebar: '#1E1F29',
          divider: '#303140',
          input: '#1E1F29',
        },
        accent: {
          rose: colors.rose,
          orange: colors.orange,
          yellow: colors.yellow,
          emerald: colors.emerald,
          cyan: colors.teal,
          blue: colors.blue,
          violet: colors.violet,
          fuchsia: colors.fuchsia,
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.white'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
