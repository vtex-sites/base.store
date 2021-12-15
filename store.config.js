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

  site: {
    title: 'Fashion Store',
    description: 'Fashion Demo Store',
    titleTemplate: '%s | Fashion Store',
  },

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
        '/power-tools/?category-1=power-tools&marca=acer&facets=category-1%2Cmarca',
      search: '/s?q=orange',
    },
  },
}
