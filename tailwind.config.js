/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      backgroundImage: {
        'desktop-light': "url('/images/bg-desktop-light.jpg')",
        'desktop-dark': "url('/images/bg-desktop-dark.jpg')",
        'mobile-light': "url('/images/bg-mobile-light.jpg')",
        'mobile-dark': "url('/images/bg-mobile-dark.jpg')"
      },
      letterSpacing: {
        'widdest': "0.5em"
      },
      colors:{
        light:{
          lightgray:'hsl(0, 0%, 98%)',
          lightGrayishBlue1:'hsl(236, 33%, 92%)',
          lightGrayishBlue2: 'hsl(233, 11%, 84%)',
          darkGrayishBlue: 'hsl(236, 9%, 61%)',
          veryDarkGrayishBlue: 'hsl(235, 19%, 35%)'
        },
        dark:{
          veryDarkBlue: 'hsl(235, 21%, 11%)',
          veryDarkDesaturatedBlue: 'hsl(235, 24%, 19%)',
          lightGrayishBlue: 'hsl(234, 39%, 85%)',
          lightGrayishBlueHover: 'hsl(236, 33%, 92%)',
          darkGrayishBlue: 'hsl(234, 11%, 52%)',
          veryDarkGrayishBlue: 'hsl(233, 14%, 35%)',
          veryDarkGrayishBlueBold:'hsl(237, 14%, 26%)'
        },
        checkbox: 'linear-gradient(133deg, rgba(0,102,255,1) 3%, rgba(102,0,204,1) 72%)'
      },
      screens:{
        sml:'534px',
        md: '640px',
        mdl: '890px',
        mv: {max:'465px'}
      }
    },
  },
  plugins: [],
}