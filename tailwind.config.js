const colors = require('tailwindcss/colors')
const daisyUI = require('daisyui')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      primary: colors.blueGray,
      secondary: colors.fuchsia,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [daisyUI],
  daisyui: {
    styled: false,
  },
}
