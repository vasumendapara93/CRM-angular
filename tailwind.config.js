/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    
],safelist: ['bg-gray-100'],
  theme: {
    extend: {},
    colors: {
      'themeblue': {
        500: '#2a349a',
        900: '#11153e',
      },
    },
  },
  plugins: [  
  ],
}

