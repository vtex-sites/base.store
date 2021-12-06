module.exports = {
  // Ecommerce Platform
  platform: 'vtex',

  // Platform specific configs for API
  api: {
    storeId: 'storeframework',
    environment: 'vtexcommercestable',
  },

  // Default channel
  channel: '1',

  // Production URLs
  storeUrl: 'https://www.vtex-base1.tk',
  checkoutUrl: 'https://chk.vtex-base1.tk/checkout',

  // Lighthouse CI
  lighthouse: {
    server: process.env.BASE_SITE_URL || 'http://localhost:9000',
    pages: {
      home: '/',
      pdp: '/navel-oranges-grown-large-fresh-fruit-880320/p',
      collection: '/food-and-beverage',
    },
  },

  // E2E CI
  cypress: {
    pages: {
      home: '/',
      pdp: '/navel-oranges-grown-large-fresh-fruit-880320/p',
      collection: '/power-tools',
      collection_filtered:
        '/sporting/?category-1=sporting&marca=nike&facets=category-1%2Cmarca&sort=score_desc',
      search: '/s?q=orange',
    },
  },
}
