const VTEXLHConfig = require('@vtex/lighthouse-config').default

const { lighthouse: lh } = require('./store.config')

module.exports = VTEXLHConfig({
  urls: [Object.values(lh.pages)[0]],
  server: lh.server,
  assertions: {
    'csp-xss': 'off',
    'legacy-javascript': ['error', { maxLength: 1 }],
  },
})
