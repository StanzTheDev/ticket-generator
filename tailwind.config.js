/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["'Inter'", "sans-serif"],
        roadRage: ["'Road Rage'", "cursive"],
        jeju: ["'Jeju Myeongjo'", "serif"],
        roboto: ["'Roboto'", "sans-serif"],
        alatsi: ["'Alatsi'", "sans-serif"],  },
    },
  },
  plugins: [],
}