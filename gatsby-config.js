require('dotenv').config({ path: 'vtex.env' })

const { join, resolve } = require('path')

const csv2json = require('csvtojson')

const images = require('./src/images/config')

const {
  GATSBY_STORE_ID: STORE_ID,
  GATSBY_VTEX_ENVIRONMENT: environment,
  GATSBY_VTEX_IO_WORKSPACE: workspace,
  GATSBY_STORE_PROFILING,
  STORE_PLP_ITEMS_PER_PAGE: itemsPerPage,
  CI: isCI,
  NODE_ENV,
  URL = `https://${STORE_ID}.vtex.app`,
  DEPLOY_PRIME_URL = URL,
  CONTEXT: ENV = NODE_ENV,
} = process.env

const allowedHosts = [`${STORE_ID}.vtex.app`, 'storetheme.vtex.com']
const isProduction = ENV === 'production'
const siteUrl = isProduction ? URL : DEPLOY_PRIME_URL

const unique = (x) => Array.from(new Set(x))

const getSizes = (variants) =>
  unique(
    Object.values(variants)
      .flatMap((variant) =>
        variant.breakpoints.map((width) => [
          `${width}x${Math.ceil(width / variant.aspectRatio)}`,
          `${width}x${Math.floor(width / variant.aspectRatio)}`,
        ])
      )
      .flat()
  )

module.exports = {
  siteMetadata: {
    title: 'Store Theme | VTEX Base Store',
    description: 'A sample store using the best of Gatsby and VTEX',
    titleTemplate: '%s | Store Theme',
    author: 'Emerson Laurentino',
    siteUrl,
  },
  flags: {
    DEV_SSR: true,
    FAST_DEV: true,
    LMDB_STORE: false,
    PARALLEL_SOURCING: true,
    PARALLEL_QUERY_RUNNING: false,
    PRESERVE_FILE_DOWNLOAD_CACHE: false,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-bundle-stats',
      options: {
        compare: true,
        baseline: true,
        html: true,
        json: true,
        outDir: `.`,
        stats: {
          context: join(__dirname, 'src'),
        },
      },
    },
    {
      resolve: '@vtex/gatsby-plugin-theme-ui',
    },
    {
      // Makes it possible to share graphql queries between
      // client/server side queries
      resolve: `@vtex/gatsby-plugin-graphql`,
    },
    {
      resolve: '@vtex/gatsby-plugin-i18n',
      options: {
        locales: ['en', 'pt'],
        defaultLocale: 'en',
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: resolve('./src'),
      },
    },
    {
      resolve: `@vtex/gatsby-source-vtex`,
      options: {
        tenant: STORE_ID,
        environment,
        workspace,
        getRedirects: () =>
          csv2json({ delimiter: ';' })
            .fromFile('./redirects.csv')
            .then((redirects) =>
              redirects.map(({ fromPath, toPath, type }) => ({
                fromPath,
                toPath,
                isPermanent: type === 'PERMANENT',
                statusCode: type === 'PERMANENT' ? 301 : 302,
              }))
            ),
      },
    },
    {
      resolve: '@vtex/gatsby-theme-store',
      options: {
        profiling: GATSBY_STORE_PROFILING,
      },
    },
    {
      resolve: '@vtex/gatsby-plugin-google-tag-manager',
      options: {
        gtmId: 'GTM-TT2MDM3',
        allowedHosts,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Store Theme - VTEX Base Store',
        short_name: 'Store Theme',
        start_url: '/',
        icon: 'src/images/icon.png',
        background_color: '#0a034e',
        theme_color: '#0a034e',
        display: 'standalone',
        cache_busting_mode: 'none',
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: [`/offline`],
        appendScript: 'src/custom-sw-code.js',
        workboxConfig: {
          globPatterns: ['**/offline/*'],
        },
      },
    },
    {
      resolve: '@vtex/gatsby-plugin-cms',
      options: {
        tenant: STORE_ID,
        workspace,
        environment,
        itemsPerPage,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => ENV,
        env: {
          production: {
            policy: [
              {
                userAgent: '*',
                allow: '/',
                disallow: ['/checkout/*'],
              },
            ],
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      resolve: '@vtex/gatsby-plugin-nginx',
      options: {
        httpOptions: [
          ['merge_slashes', 'off'],
          ['proxy_http_version', '1.1'],
        ],
        serverOptions: isCI
          ? [['resolver', '169.254.169.253']]
          : [['resolver', '8.8.8.8']],
      },
    },
    {
      resolve: 'gatsby-plugin-next-seo',
      options: {
        defer: true,
      },
    },
    {
      resolve: '@vtex/gatsby-plugin-performance',
      options: {
        enableServerRouting: true,
        enableNonBlockingStart: true,
      },
    },
    {
      resolve: 'gatsby-plugin-image',
    },
    {
      resolve: '@vtex/gatsby-plugin-thumbor',
      options: {
        server: isCI
          ? 'http://thumbor.vtex.internal'
          : 'http://thumbor.thumborize.me',
        ...(isProduction && {
          basePath: '/assets',
          sizes: getSizes(images),
        }),
      },
    },
  ],
}
