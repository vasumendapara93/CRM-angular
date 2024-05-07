/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js"
],
safelist : [
  'bg-success',
   'bg-danger',
   'bg-warn'
  ],
  theme: {
    extend: {},
    colors: {
      'themeblue': {
        50: '#f5f8fa',
        100: '#f1f5f9',
        200: '#e7f2ff',
        400: '#3b82f6',
        500: '#2a349a',
        900: '#11153e',
      },
      'backdrop':{
        900 : '#0000003a',
      },
      'custom-bg-gray':{
        900: 'f1f5f9'
      }
    },
  },
  plugins: [  
    require('flowbite/plugin')
  ],
}
