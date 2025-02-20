/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#3B82F6",
        secondary: "#10B981",
        gray: "#1F2937",
      },
    },
  },
  plugins: [require("daisyui")],
};
