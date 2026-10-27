/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // helvetica: ['Manrope', 'sans-serif']
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',     // IE and Edge
          'scrollbar-width': 'none',        // Firefox
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none',                  // Chrome, Safari
        },
      });
    },
  ],
}
