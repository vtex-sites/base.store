const VTEXLHConfig = require('@vtex/lighthouse-config').default

const urls = ['/', '/women', '/organza-sleeve-top-138/p']

module.exports = VTEXLHConfig({
  urls,
  server: process.env.BASE_SITE_URL,
  assertions: {
    'csp-xss': 'off',
    'legacy-javascript': ['error', { maxLength: 1 }],
  },
})
