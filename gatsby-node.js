const path = require('path')

const { copyLibFiles } = require('@builder.io/partytown/utils')

const { schema } = require('./src/server')

exports.onPreInit = async ({ reporter }) => {
  reporter.info('Copying Partytown Files')

  await copyLibFiles(path.resolve('./public/~partytown'))
}

exports.onCreateWebpackConfig = ({ actions: { setWebpackConfig }, stage }) => {
  const isProfilingEnabled = process.env.GATSBY_STORE_PROFILING === 'true'

  if (stage === 'build-javascript' && isProfilingEnabled) {
    setWebpackConfig({
      optimization: {
        minimize: false,
        moduleIds: 'named',
        chunkIds: 'named',
        concatenateModules: false,
      },
    })
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
