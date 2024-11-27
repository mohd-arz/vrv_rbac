/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        cyan: "#6CD9D3",
        "dark-cyan": "#00353C",
        "t-blue": "#42a7ff",
        "mustard-yello": "#e9c81c",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
