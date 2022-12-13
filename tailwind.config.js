/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'desktop-light':'url(../public/images/bg-desktop-light.jpg)',
        'desktop-dark':"url('../public/images/bg-desktop-dark.jpg')",
        'mobile-light':"url('../public/images/bg-mobile-light.jpg')",
        'mobile-dark':"url('../public/images/bg-mobile-dark.jpg')"
      },
      letterSpacing:{
        'widdest':"0.5em"
      }
    },
  },
  plugins: [],
}