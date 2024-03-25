/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.start': {
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        },
        '.end': {
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        },
        '.between': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
