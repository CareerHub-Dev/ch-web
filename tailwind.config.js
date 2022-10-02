/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      darkerBlueTransparent: '#000e2e96',
      darkerBlue: '#000e2e',
      darkBlueAccent: '#002477',
      primaryBlue: '#0040d2',
      lightBlueAccent: '#3fa2ff',
      lightBlue: '#dff5ff',
      primaryRed: '#ff2970',
      primaryOrange: '#ff802b',
      primaryBlack: '#111',
      darkerGrey: '#424242',
      primaryGrey: '#f5f8fc',
      primaryWhite: '#eff5ff',
    },
  },
  plugins: [],
};
