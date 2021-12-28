const fs = require('fs')
const path = require('path')

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

  if (stage === 'develop') {
    copyPartytown()
  }
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: `@vtex/graphql-utils/babel`,
    options: {},
  })
}

const copyRecursiveSync = (src, dest) => {
  const exists = fs.existsSync(src)
  const stats = exists && fs.statSync(src)
  const isDirectory = exists && stats.isDirectory()
  const destinationExists = fs.existsSync(dest)

  if (destinationExists) {
    return
  }

  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true })
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      )
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}

const copyPartytown = () => {
  copyRecursiveSync(
    path.join(__dirname, 'node_modules/@builder.io/partytown/lib'),
    path.join(__dirname, 'static/~partytown')
  )
}

exports.onPreBuild = ({ reporter }) => {
  reporter.info('Copying Partytown Files')
  copyPartytown()
}
