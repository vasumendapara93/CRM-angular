/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  safelist: [
    'bg-success',
    'bg-danger',
    'bg-warn',
    'border-success',
    'border-danger',
    'border-warn',
    'text-success',
    'text-danger',
    'text-warn'
  ],
  theme: {
    extend: {},
    screens: {
      '2xs': '365px',
      'xs': '436px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    colors: {
      'themeblue': {
        50: '#f5f8fa',
        100: '#f1f5f9',
        200: '#e7f2ff',
        400: '#3b82f6',
        500: '#2a349a',
        900: '#11153e',
      },
      'backdrop': {
        800: '#00000084',
        900: '#0000003a',
      },
      'red': {
        100: '#ffebeb',
        200: '#fbe0e0'
      }
    },
  },
  plugins: [
  ],
}
