/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'black-piano': {
          1: '#120F13',
          2: '#0B090C',
        },
      }
    },
  },
  plugins: [require("tailwindcss-bg-patterns")],
};
