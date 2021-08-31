const VTEXLHConfig = require('@vtex/lighthouse-config').default

const urls = ['/', '/women', '/camiseta-azul-marinho/p']

module.exports = VTEXLHConfig({
  urls,
  server: process.env.BASE_SITE_URL,
  assertions: {
    'legacy-javascript': ['error', { maxLength: 1 }],
  },
})
