/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-login' : "url('/src/public/image/bg.jpg')"
      }
    },
  },
  plugins: [],
}

