/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f4f8ff",
        secondary: "#ffffff",

        textPrimary: "#111827",
        textSecondary: "#6b7280",
      },
    },
  },
  plugins: [],
};
