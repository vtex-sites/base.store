const VTEXLHConfig = require('@vtex/lighthouse-config').default

const urls = ['/', '/masculino', '/camiseta-azul-marinho/p']

module.exports = VTEXLHConfig({
  urls,
  server: process.env.BASE_SITE_URL,
  assertions: {
    'legacy-javascript': ['error', { maxLength: 1 }],
  },
})
