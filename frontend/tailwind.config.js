/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
    colors: {
      primaryColor: '#3195ff',
      secondaryColor:' #333',
      darkColor: '#000',
      lightColor: '#f4f4f4',
      greenBorder: '#1CB698',
      veryDarkBlue: 'hsl(229, 31%, 21%)',
      yellowSpan: '#f8e825',
      coverColor: '#2b6a7ef7',
      buttonsColor: '#133B5C',
      buttonColor: '#1D2D50',
      greenColor: '#03C988',
      beigeColor: '#FCDAB7',
      redColor: '#B42B51',
      grayColor: '#BDCDD6',
      skyblueColor: '#6096B4',
      grayColor: '#7D7D8C',
      greenPrice: '#4BAA1E',
    },
    fontFamily: {
      sans: ['Barlow Semi Condensed', 'sans-serif'],
      mono: ['Righteous'],
    },
    opacity: {
      '8': '.8',
    }
  },
  plugins: [],
}