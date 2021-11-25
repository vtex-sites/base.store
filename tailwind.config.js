module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      primary: 'var(--primary-color)',
      light: 'var(--light)',
      'link-positive': 'var(--link-positive)',
      'link-negative': 'var(--link-negative)',
      'call-to-action': 'var(--primary-color)',
      muted: 'var(--muted-primary)',
    },

    textColor: {
      primary: 'var(--dark)',
      'title-color': 'var(--darker)',
      link: 'var(--link-positive)',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
