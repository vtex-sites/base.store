import path from 'path'

import type { GatsbyNode } from 'gatsby'
import { copyLibFiles } from '@builder.io/partytown/utils'

import { apiSchema } from './src/server'

export const onPreInit: GatsbyNode['onPreInit'] = async ({ reporter }) => {
  reporter.info('Copying Partytown Files')

  await copyLibFiles(path.resolve('./public/~partytown'))
}

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions: { setWebpackConfig },
  stage,
}) => {
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

export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = ({
  actions,
}) => {
  actions.setBabelPlugin({
    name: `@vtex/graphql-utils/babel`,
    options: {},
  })
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  async (gatsbyApi) => {
    const { actions } = gatsbyApi

    actions.addThirdPartySchema({ schema: await apiSchema })
  }
