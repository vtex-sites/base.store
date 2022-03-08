const VTEXLHConfig = require('@vtex/lighthouse-config').default

const { lighthouse: lh } = require('./store.config')

module.exports = VTEXLHConfig({
  urls: Object.values(lh.pages),
  server: lh.server,
  assertions: {
    'csp-xss': 'off',
    'legacy-javascript': ['error', { maxLength: 1 }],
    /*
     * Lazy components with dynamic import will create another a new script resource,
     * then this test may fail, so change the maxNumericValue
     */
    'resource-summary:image:count': [
      'error',
      {
        maxNumericValue: 30,
      },
    ],
  },
})
