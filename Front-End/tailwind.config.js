import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
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