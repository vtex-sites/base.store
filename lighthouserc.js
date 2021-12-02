const VTEXLHConfig = require('@vtex/lighthouse-config').default

const urls = [
  '/',
  '/food-and-beverage',
  '/navel-oranges-grown-large-fresh-fruit-880320/p',
]

module.exports = VTEXLHConfig({
  urls,
  server: process.env.BASE_SITE_URL,
  assertions: {
    'csp-xss': 'off',
    'legacy-javascript': ['error', { maxLength: 1 }],
  },
})
