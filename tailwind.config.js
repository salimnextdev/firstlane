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
plugins: [require("tailwindcss-animate")],
}
