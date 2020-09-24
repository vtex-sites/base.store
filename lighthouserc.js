const { BASE_SITE_URL } = process.env

const server = BASE_SITE_URL
  ? BASE_SITE_URL.replace('.com', '.app')
  : 'http://localhost:9000'

const urls = ['/', '/vintage-phone/p/', '/apparel---accessories/'].map(
  (path) => `${server}${path}`
)

module.exports = {
  ci: {
    collect: {
      url: urls,
      numberOfRuns: 5,
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:pwa': 'off',
        'categories:seo': ['error', { minScore: 0.9 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.2 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'is-crawlable': 'off', // preview pages are not crawlable
        'largest-contentful-paint': ['error', { maxNumericValue: 3500 }],
        'max-potential-fid': ['error', { maxNumericValue: 300 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'unused-javascript': ['error', { maxLength: 10 }],
        'uses-long-cache-ttl': 'off',
        'uses-rel-preconnect': 'warn', // somehow lighthouse ci can't find the dns-prefetch tags we are adding
        'uses-text-compression': ['warn', { maxLength: 1 }],
        bypass: 'off',
        interactive: ['error', { maxNumericValue: 3000 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
      urlReplacementPatterns: 's/.*app//',
    },
  },
}
