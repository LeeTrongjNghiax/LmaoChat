/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        "color-theme1": "black", 
        "color-theme2": "white", 
      }, 
      textColor: {
        "color-theme1": "white", 
        "color-theme2": "gray-950", 
      }, 
    },
  },
  safelist: [
    {
      pattern: /text-color-(theme1|theme2)/
    }, 
    {
      pattern: /bg-color-(theme1|theme2)/
    }, 
  ], 
  plugins: [],
}