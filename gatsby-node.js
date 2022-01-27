const path = require('path')

const fs = require('fs-extra')

const config = require('./store.config')

const { secureSubdomain, loginUrl, accountUrl } = config

exports.onPreInit = ({ reporter }) => {
  reporter.info('Copying Partytown Files')

  // Copy @builder.io/partytown lib files to the <rootPath>/static/~partytown.
  // Those files are used by the Partytown component.
  fs.ensureDirSync(path.resolve('./static'))
  fs.copySync(
    path.resolve('./node_modules/@builder.io/partytown/lib'),
    path.resolve('./static/~partytown')
  )
}

exports.onCreateWebpackConfig = ({ actions: { setWebpackConfig }, stage }) => {
  const profiling = process.env.GATSBY_STORE_PROFILING === 'true'

  if (stage === 'build-javascript') {
    if (profiling) {
      setWebpackConfig({
        optimization: {
          minimize: false,
          moduleIds: 'named',
          chunkIds: 'named',
          concatenateModules: false,
        },
      })
    } else {
      setWebpackConfig({
        optimization: {
          runtimeChunk: {
            name: `webpack-runtime`,
          },
          splitChunks: {
            name: false,
            cacheGroups: {
              styles: {
                name: `styles`,
                test: /\.(css|scss)$/,
                chunks: `initial`,
                enforce: true,
              },
            },
          },
        },
      })
    }
  }
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: `@vtex/graphql-utils/babel`,
    options: {},
  })
}

exports.createPages = async ({ actions: { createRedirect } }) => {
  createRedirect({
    fromPath: '/login/',
    toPath: loginUrl,
    statusCode: 301,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/account/',
    toPath: accountUrl,
    statusCode: 301,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/_v/private/graphql/*',
    toPath: `${secureSubdomain}/_v/private/graphql/:splat`,
    statusCode: 301,
  })

  createRedirect({
    fromPath: '/_v/public/graphql/*',
    toPath: `${secureSubdomain}/_v/public/graphql/:splat`,
    statusCode: 301,
  })

  createRedirect({
    fromPath: '/_v/segment/graphql/*',
    toPath: `${secureSubdomain}/_v/segment/graphql/:splat`,
    statusCode: 301,
  })

  createRedirect({
    fromPath: '/api/vtexid/*',
    toPath: `${secureSubdomain}/api/vtexid/:splat`,
    statusCode: 301,
  })

  createRedirect({
    fromPath: '/api/sessions/*',
    toPath: `${secureSubdomain}/api/sessions/:splat`,
    statusCode: 301,
  })
}
