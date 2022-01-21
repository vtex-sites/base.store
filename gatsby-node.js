const path = require('path')

const fs = require('fs-extra')

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
