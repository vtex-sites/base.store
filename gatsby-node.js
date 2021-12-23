// const path = require('path')

// const CopyPlugin = require('copy-webpack-plugin')

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

  // TODO: Copy files from partytown
  // setWebpackConfig({
  // plugins: [
  // new CopyPlugin({
  // patterns: [
  // {
  // from: path.join(
  // __dirname,
  // 'node_modules',
  // '@builder.io',
  // 'partytown',
  // 'lib'
  // ),
  // to: path.join(__dirname, 'public', '~partytown'),
  // },
  // ],
  // }),
  // ],
  // })
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: `@vtex/graphql-utils/babel`,
    options: {},
  })
}
