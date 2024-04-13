/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
<<<<<<< HEAD
    
],safelist: ['bg-gray-100'],
=======
],
safelist : [
  'bg-success',
   'bg-danger'
  ],
>>>>>>> b1c057d67b5ffa2dd1930e42befd4ec49523ab16
  theme: {
    extend: {},
    colors: {
      'themeblue': {
        100: '#f1f5f9',
        500: '#2a349a',
        900: '#11153e',
      },
    },
  },
  plugins: [  
  ],
}

