/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{html,js,php}',
  ],
  theme: {
    extend: {
      zIndex: {
        '99': '-10',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
