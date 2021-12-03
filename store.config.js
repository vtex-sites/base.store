module.exports = {
  // Ecommerce Platform
  platform: 'vtex',

  // Platform specific configs for API
  api: {
    storeId: 'fashioneurope',
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
      pdp: '/organza-sleeve-top-138/p',
      collection: '/women',
    },
  },

  // E2E CI
  cypress: {
    pages: {
      home: '/',
      pdp: '/organza-sleeve-top-138/p',
      collection: '/women',
      collection_filtered:
        '/women/?category-1=women&color=red&facets=category-1%2Ccolor',
      search: '/s?q=shirt',
    },
  },
}
