// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}"
//   ],
//   theme: {
//     extend: {
//       backgroundColor: {
//         "color-theme1": "black", 
//         "color-theme2": "white", 
//         "color-primary-theme1": "blue", 
//         "color-primary-hover-theme1": "red", 
//         "color-primary-theme2": "darkblue", 
//         "color-primary-hover-theme2": "red", 
//       }, 
//       textColor: {
//         "color-theme1": "white", 
//         "color-theme2": "gray-950", 
//         "color-primary-theme1": "blue", 
//         "color-primary-hover-theme1": "red", 
//         "color-primary-theme2": "darkblue", 
//         "color-primary-hover-theme2": "red", 
//       }, 
//     },
//   },
//   safelist: [
//     {
//       pattern: /text-color-(theme1|theme2)/
//     }, 
//     {
//       pattern: /text-color-primary-(theme1|theme2)/
//     }, 
//     {
//       pattern: /text-color-primary-hover-(theme1|theme2)/
//     }, 
//     {
//       pattern: /bg-color-(theme1|theme2)/
//     }, 
//     {
//       pattern: /bg-color-primary-(theme1|theme2)/
//     }, 
//     {
//       pattern: /bg-color-primary-hover-(theme1|theme2)/
//     }, 
//   ], 
//   plugins: [],
// }

const tailwindConfig = require("./src/tailwind.config.js");

module.exports = tailwindConfig;