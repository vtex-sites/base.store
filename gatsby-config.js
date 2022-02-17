require('dotenv').config({ path: 'vtex.env' })

const { join, resolve } = require('path')

const config = require('./store.config')

const {
  NODE_ENV,
  URL = config.storeUrl,
  DEPLOY_PRIME_URL = URL,
  CONTEXT: ENV = NODE_ENV,
  VTEX_WEBOPS: isWebOps,
} = process.env

const isProduction = ENV === 'production'
const siteUrl = isProduction ? URL : DEPLOY_PRIME_URL

module.exports = {
  siteMetadata: {
    title: 'FastStore',
    description: 'Fast Demo Store',
    titleTemplate: '%s | FastStore',
    author: 'Store Framework',
    siteUrl,
  },
  flags: {
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
  },
  plugins: [
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Fast Demo Store',
        short_name: 'FastStore',
        start_url: '/',
        icon: 'src/images/icon.png',
        background_color: '#E31C58',
        theme_color: '#ffffff',
        display: 'standalone',
        cache_busting_mode: 'none',
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
        server: 'https://thumbor-server.vtex.io',
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
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'bundle-analyser.html',
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
    {
      resolve: 'gatsby-plugin-gatsby-cloud',
    },
    {
      resolve: 'gatsby-plugin-netlify',
    },
    {
      resolve: 'gatsby-plugin-postcss',
    },
  ],
}
