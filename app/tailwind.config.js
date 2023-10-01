/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {backgroundImage: {
      'gometry': "url('/src/require/img.png')"
      
    }},
  },
  plugins: [],
}