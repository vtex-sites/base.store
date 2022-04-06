const { schema } = require('./src/server/index.js')

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
