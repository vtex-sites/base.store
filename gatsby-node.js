const path = require('path')

const fs = require('fs-extra')

const { findLoader } = require('./src/utils')

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

exports.onCreateWebpackConfig = ({ actions, stage, getConfig }) => {
  const profiling = process.env.GATSBY_STORE_PROFILING === 'true'

  if (stage === 'build-javascript') {
    if (profiling) {
      actions.setWebpackConfig({
        optimization: {
          minimize: false,
          moduleIds: 'named',
          chunkIds: 'named',
          concatenateModules: false,
        },
      })
    } else {
      actions.setWebpackConfig({
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
        // module: {
        //   loaders: [
        //     {
        //       test: /\.(css|scss)$/,
        //       loader: 'dropcss-loader',
        //     },
        //   ],
        // },
      })

      const config = getConfig()
      const existingRules = config.module.rules

      // const customLoader = {
      //   loader: 'dropcss-loader',
      //   // options: {},
      // }

      for (const rules of existingRules) {
        for (const rule of rules.oneOf || []) {
          if (Array.isArray(rule.use)) {
            const index = findLoader(rule.use, /css-loader/)

            // const loader = rule.use[index]
            if (index !== -1) {
              rule.sideEffects = false
            }
            // insertLoader(rule.use, index, loader)
          }
        }
      }

      actions.replaceWebpackConfig(config)
    }
  }
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: `@vtex/graphql-utils/babel`,
    options: {},
  })
}
