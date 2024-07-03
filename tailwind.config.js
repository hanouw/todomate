/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "my-color-gray": "#D9DDE0",
      },
      width: {
        mywidth1200: "1200px",
        mywidth90: "90vw",
      },
    },
  },
  plugins: [],
};
