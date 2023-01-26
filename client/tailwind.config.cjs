/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: "#161A1D",
        black: "#0B090A",
        "red-dark": "#660708",
        red: "#BA181B",
        "red-light": "#E5383B",
      },
    },
  },
  plugins: [],
};
