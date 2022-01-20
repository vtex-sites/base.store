const path = require('path')

const critical = require('critical')
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

exports.onCreateWebpackConfig = ({ actions, stage }) => {
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

exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)

  critical.generate({
    // Inline the generated critical-path CSS
    // - true generates HTML
    // - false generates CSS
    inline: true,

    // Your base directory
    base: 'public/',

    // HTML source file
    src: 'index.html',
    // dest: 'index.html',

    // Your CSS Files (optional)
    // css: ['dist/styles/main.css'],

    dimensions: [
      {
        width: 500,
        height: 900,
      },
      {
        width: 1280,
        height: 900,
      },
    ],

    // Output results to file
    target: {
      css: 'critical.css',
      // html: 'index-critical.html',
      html: 'index.html',
      uncritical: 'uncritical.css',
    },

    // Extract inlined styles from referenced stylesheets
    extract: true,

    // ignore CSS rules
    ignore: {
      atrule: ['@font-face'],
    },
  })
}
