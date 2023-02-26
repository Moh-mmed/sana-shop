/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        move: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(10px)",
          },
        },
      },
      animation: {
        "moving-right": "move 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
