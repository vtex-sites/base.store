const { GatsbyNode } = require('@vtex/gatsby-source-store')

const { getSchema, getContextFactory } = require('./src/server')

exports.onCreateWebpackConfig = ({ actions: { setWebpackConfig }, stage }) => {
  const profiling = process.env.GATSBY_STORE_PROFILING === 'true'

  if (stage === 'build-javascript' && profiling) {
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

const options = {
  sourceProducts: false,
  sourceCollections: true,
  getSchema,
  getContextFactory,
  maxNumProducts: 2500,
  maxNumCollections: 2500,
}

exports.createSchemaCustomization = async (gatsbyApi) => {
  await GatsbyNode.createSchemaCustomization(gatsbyApi, options)
}

exports.sourceNodes = async (gatsbyApi) => {
  await GatsbyNode.sourceNodes(gatsbyApi, options)
}
