/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#1F7793",
        "faint-blue": "#D2E4E9",
        "dark-ash": "#343535",
      },
    },
  },
  plugins: [],
};
