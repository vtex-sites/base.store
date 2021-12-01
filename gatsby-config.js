require('dotenv').config({ path: 'vtex.env' })

const { join, resolve } = require('path')

const images = require('./src/images/config')
const config = require('./store.config')

const {
  NODE_ENV,
  URL = `https://${config.store}.vtex.app`,
  DEPLOY_PRIME_URL = URL,
  CONTEXT: ENV = NODE_ENV,
  VTEX_WEBOPS: isWebOps,
  GATSBY_CLOUD: isGatsbyCloud,
} = process.env

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
    title: 'Fashion Store',
    description: 'Fashion Demo Store',
    titleTemplate: '%s | Fashion Store',
    author: 'Store Framework',
    siteUrl,
  },
  flags: {
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Fashion Demo Store',
        short_name: 'Fashion Store',
        start_url: '/',
        icon: 'src/images/icon.png',
        background_color: '#E31C58',
        theme_color: '#E31C58',
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
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-next-seo',
      options: {
        defer: true,
      },
    },
    {
      resolve: 'gatsby-plugin-image',
    },
    {
      resolve: '@vtex/gatsby-plugin-thumbor',
      options: {
        server: 'https://thumbor-dev-server.vtex.io',
        ...(isWebOps && {
          server: 'http://thumbor.vtex.internal',
          basePath: '/assets',
          sizes: getSizes(images),
        }),
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#E31C58',
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: resolve('./src'),
        '@generated': resolve('./@generated'),
      },
    },
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
      resolve: '@vtex/gatsby-plugin-nginx',
      options: {
        httpOptions: [
          ['merge_slashes', 'off'],
          ['proxy_http_version', '1.1'],
          ['absolute_redirect', 'off'],
        ],
        serverOptions: isWebOps
          ? [['resolver', '169.254.169.253']]
          : [['resolver', '8.8.8.8']],
        locations: {
          append: {
            cmd: ['location', '/'],
            children: [
              {
                cmd: [
                  'add_header',
                  'Cache-Control',
                  '"public, max-age=0, must-revalidate"',
                ],
              },
              {
                cmd: [
                  'try_files',
                  '$uri',
                  '$uri/',
                  '$uri/index.html',
                  '$uri.html',
                  '=404',
                ],
              },
            ],
          },
        },
      },
    },
    ...[
      isNetlify && {
        resolve: 'gatsby-plugin-netlify',
      },
    ],
    ...[
      isGatsbyCloud && {
        resolve: 'gatsby-plugin-gatsby-cloud',
      },
    ],
    {
      resolve: 'gatsby-plugin-postcss',
    },
  ].filter((plugin) => Boolean(plugin)),
}
