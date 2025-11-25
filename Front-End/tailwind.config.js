import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1", // Indigo 500
        secondary: "#a855f7", // Purple 500
        accent: "#ec4899", // Pink 500
        background: "#0f172a", // Slate 900
        surface: "#1e293b", // Slate 800
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      animation: {
        border: "border 4s linear infinite",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
      },
    },
  },
  plugins: [daisyui],
}