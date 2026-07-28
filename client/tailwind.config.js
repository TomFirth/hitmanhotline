/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hitman-red': '#8b0000',
        'hitman-black': '#1a1a1a',
        'hitman-gray': '#2d2d2d',
      }
    },
  },
  plugins: [],
}
