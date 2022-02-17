const path = require('path')

const { copyLibFiles } = require('@builder.io/partytown/utils')

const { schema } = require('./src/server')

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

exports.createSchemaCustomization = async (gatsbyApi) => {
  const { actions } = gatsbyApi

  actions.addThirdPartySchema({ schema: await schema })
}
