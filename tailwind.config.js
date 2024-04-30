/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
      ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        garden: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#A2422C",
          warning: "#f6d860",
          accent: "#37cdbe",
          neutral: "#B6B6B6",
          error: "#e42300",
          success: "#03C223",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

