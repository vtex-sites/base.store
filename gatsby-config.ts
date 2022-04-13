import { join, resolve } from 'path'

import dotenv from 'dotenv'
import type { GatsbyConfig } from 'gatsby'

import config from './store.config'

dotenv.config({ path: 'vtex.env' })

const gatsbyConfig: GatsbyConfig = {
  jsxRuntime: 'automatic',
  siteMetadata: {
    title: 'BaseStore',
    description: 'Fast Demo Store',
    titleTemplate: '%s | FastStore',
    author: 'Store Framework',
    siteUrl: config.storeUrl,
  },
  flags: {
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Fast Demo Store',
        short_name: 'BaseStore',
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
        resolveEnv: () => process.env.NODE_ENV || 'development',
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
          development: {
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

export default gatsbyConfig
