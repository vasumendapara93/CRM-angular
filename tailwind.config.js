/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
],
safelist : [
  'bg-success',
   'bg-danger'
  ],
  theme: {
    extend: {},
    colors: {
      'themeblue': {
        100: '#f1f5f9',
        500: '#2a349a',
        900: '#11153e',
      },
      'custom-bg-gray':{
        900: 'f1f5f9'
      }
    },
  },
  plugins: [  
  ],
}

