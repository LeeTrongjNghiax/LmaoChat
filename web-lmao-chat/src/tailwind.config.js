// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        "color-primary-theme1": "black", 
        "color-primary-theme2": "white", 
      }, 
      borderColor: {
        "color-primary-theme1": "black", 
        "color-primary-theme2": "white", 
      }, 
      buttonColor: {
        "color-primary-theme1": "#4169e1", 
        "color-primary-theme2": "blue",
      }, 
      chatBackgroundColor: {
        "color-primary-theme1": "#121212", 
        "color-primary-theme2": "#eeeeee",
      }, 
      iconColor: {
        "color-primary-theme1": "white", 
        "color-primary-theme2": "black", 
      }, 
      textColor: {
        "color-primary-theme1": "white", 
        "color-primary-theme2": "black", 
      }, 
      linkColor: {
        // "color-primary-theme1": "#1f0cc4", 
        "color-primary-theme1": "#4169e1", 
        // "color-primary-theme2": "#180d33",
        "color-primary-theme2": "blue",
      }
    },
  },
  safelist: [
    
  ], 
  plugins: [],
}
