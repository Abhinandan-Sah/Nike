/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Oswald: ["Oswal"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
