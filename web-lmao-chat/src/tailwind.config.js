// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        "color-theme1": "black", 
        "color-theme2": "white", 
        "color-primary-theme1": "royalBlue", 
        "color-primary-hover-theme1": "red", 
        "color-primary-theme2": "mediumBlue", 
        "color-primary-hover-theme2": "red", 
      }, 
      textColor: {
        "color-theme1": "white", 
        "color-theme2": "black", 
        "color-primary-theme1": "royalBlue", 
        "color-primary-hover-theme1": "red", 
        "color-primary-theme2": "mediumBlue", 
        "color-primary-hover-theme2": "red", 
      }, 
      borderColor: {
        "color-theme1": "red-800", 
        "color-theme2": "blue-800", 
      }
    },
  },
  safelist: [
    {
      pattern: /text-color-(theme1|theme2)/
    }, 
    {
      pattern: /text-color-primary-(theme1|theme2)/
    }, 
    {
      pattern: /text-color-primary-hover-(theme1|theme2)/
    }, 
    {
      pattern: /bg-color-(theme1|theme2)/
    }, 
    {
      pattern: /bg-color-primary-(theme1|theme2)/
    }, 
    {
      pattern: /bg-color-primary-hover-(theme1|theme2)/
    }, 
    {
      pattern: /border-color-(theme1|theme2)/
    }, 
  ], 
  plugins: [],
}
