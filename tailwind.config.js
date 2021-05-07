module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      'sm': '5em',
      'md': '10em',
      'lg': '15em',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
