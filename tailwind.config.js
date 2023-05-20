/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#3B86C6',
        },
        gray: {
          500: '#5C5C5C',
          900: '#3A3A3A',
        },
      },
    },
  },
  plugins: [],
}
