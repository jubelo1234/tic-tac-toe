/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-navy": "#1A2A33",
        "semi-dark-navy": "#1F3641",
        "silver-cl": "#A8BFC9",
        "silver-hover": "#DBE8ED",
        "light-blue": "#31C3BD",
        "light-blue-hover": "#65E9E4",
        "light-yellow": "#F2B137",
        "light-yellow-hover": "#FFC860",
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      boxShadow: {
        pick: "inset 0 -8px 0 #10212a",
        vcp: "inset 0 -8px 0 #cc8b13",
        vpl: "inset 0 -8px 0 #118c87",
        turn: "inset 0 -4px 0 #10212a",
        res: "inset 0 -4px 0 #6b8997",
      },
      screens: {
        exsm: "330px",
        tab: "720px",
      },
    },
  },
  plugins: [],
};
