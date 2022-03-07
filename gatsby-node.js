const path = require('path')

const { copyLibFiles } = require('@builder.io/partytown/utils')

exports.onPreInit = async ({ reporter }) => {
  reporter.info('Copying Partytown Files')

  await copyLibFiles(path.resolve('./public/~partytown'))
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
        resolve: {
          alias: {
            '@faststore/ui': path.resolve(
              './node_modules/@faststore/ui/src/index.ts'
            ),
            '@faststore/sdk': path.resolve(
              './node_modules/@faststore/sdk/src/index.ts'
            ),
            'gatsby-plugin-next-seo': path.resolve(
              './node_modules/gatsby-plugin-next-seo/src/index.tsx'
            ),
          },
        },
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
