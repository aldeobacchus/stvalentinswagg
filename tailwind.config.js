/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'comic-sans': ['"Comic Sans MS"', 'cursive', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
