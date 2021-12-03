const VTEXLHConfig = require('@vtex/lighthouse-config').default

const { lighthouse: lh } = require('./store.config')

module.exports = VTEXLHConfig({
  urls: lh.pages,
  server: Object.values(lh.server),
  assertions: {
    'csp-xss': 'off',
    'legacy-javascript': ['error', { maxLength: 1 }],
  },
})
