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
      pdp: '/sleek-metal-pizza-24041857/p',
      collection: '/office',
    },
  },

  // E2E CI
  cypress: {
    pages: {
      home: '/',
      pdp: '/sleek-metal-pizza-24041857/p',
      collection: '/office',
      collection_filtered:
        '/office/?category-1=office&marca=acer&facets=category-1%2Cmarca',
      search: '/s?q=orange',
    },
  },

  analytics: {
    // https://developers.google.com/tag-platform/tag-manager/web#standard_web_page_installation,
    gtmContainerId: 'GTM-PGHZ95N',
  },
}
