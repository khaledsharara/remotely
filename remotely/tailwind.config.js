/** @type {import('tailwindcss').Config} */
export default {
  content: ["./modules/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        title: "3rem", // 100px
        xl: "1.667rem", // 40px
        l: "0.833rem", // 20px
        m: "0.583rem", // 14px
        s: "0.4rem", // 12px
        xs: "0.333rem", // 8px
        nav: "1.0rem", // 24px
      },
      fontFamily: {
        main: ["Montserrat", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
      colors: {
        background: "#DEDEDE",
        button: "#BFBFBF",

        white: "#FFFFFF",
        black: "#2D2D2D",

        primary: "#287AFF",
        "primary-light": "#E6F0FF",
        "primary-dark": "#0F4CFF",

        "card-homework": "#5E9BFF",
        "card-quiz": "#87A0A9",
        "card-material": "#96CFCF",
        "card-announcement": "#898BBA",
        "card-from": "#D3D2D1",
      },
    },
  },
  plugins: [],
};
