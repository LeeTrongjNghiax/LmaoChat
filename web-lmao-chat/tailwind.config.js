/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        "color-theme1": "white", 
        "color-theme2": "black", 
      }, 
      textColor: {
        "color-theme1": "gray-950", 
        "color-theme2": "white", 
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