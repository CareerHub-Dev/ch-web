/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        careerHub: ['"Noto Sans"', '"Open Sans"', 'sans-serif'],
        rancho: ['"Rancho"', 'cursive'],
      },
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
        lightGray: '#f5f8fc',
        primaryGray: '#d1d5db',
        primaryGrayDarker: '#6b7280',
        darkGray: '#424242',
        primaryWhite: '#eff5ff',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
