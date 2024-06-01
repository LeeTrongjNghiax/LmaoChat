/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/*.{js,jsx,ts,tsx}", 
    "./contexts/*.{js,jsx,ts,tsx}", 
    "./pages/*.{js,jsx,ts,tsx}", 
    "./services/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}", 
    "./contexts/**/*.{js,jsx,ts,tsx}", 
    "./pages/**/*.{js,jsx,ts,tsx}", 
    "./services/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      backgroundColor: {
        "color-theme1": "#000000", 
        "color-theme2": "white", 
        "color-primary-theme1": "#4169e1", 
        "color-primary-hover-theme1": "red", 
        "color-primary-theme2": "mediumBlue", 
        "color-primary-hover-theme2": "red", 
      }, 
      textColor: {
        "color-theme1": "#ffffff", 
        "color-theme2": "gray-950", 
        "color-primary-theme1": "royalBlue", 
        "color-primary-hover-theme1": "red", 
        "color-primary-theme2": "mediumBlue", 
        "color-primary-hover-theme2": "red", 
      }, 
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
  ], 
  plugins: [],
}

