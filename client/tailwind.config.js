module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#E5E9F3',
        secondary: '#b6c1db',
        tertiary: '#3978D3'
      },
      height: {
        box: '465px'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
