import type { GatsbyNode } from 'gatsby'

import { apiSchema } from './src/server'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions: { setWebpackConfig },
  stage,
}) => {
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

    const schema = await apiSchema

    actions.addThirdPartySchema({ schema })
  }
