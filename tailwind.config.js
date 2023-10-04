/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme("colors"),
        nav: "#0F0023",
        hover: "#EC744F",
        primary: "#0a0028",
        crem: "#fcab63",
        customBlue: "#2B7FC3",
        lightYellow: "#FFFEF0",
        darkYellow: "#EDEEE2",
      }),
      textColor: theme => ({
        ...theme("colors"),
        nav: "#0F0023",
        hover: "#EC744F",
        primary: "#0a0028",
        crem: "#fcab63",
        customBlue: "#2B7FC3",
        darkBlue: "#324655"
      }),
      colors: {
        primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a", "950": "#172554" }
      }
    },

  },
  plugins: [],
}
)
