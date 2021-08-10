const { merge } = require('webpack-merge')

exports.onCreateWebpackConfig = ({
  actions: { replaceWebpackConfig },
  stage,
  getConfig,
}) => {
  const gatsbyConfig = getConfig()

  // Use es6 module only on web-based targets
  const moduleConfig =
    stage === 'build-javascript'
      ? {
          output: {
            module: true,
          },
          experiments: {
            outputModule: true,
          },
        }
      : {}

  const webpackConfig = merge(gatsbyConfig, moduleConfig)

  // Targets modern browsers
  if (stage === 'build-javascript') {
    webpackConfig.target = ['web', 'es2017']
  }

  replaceWebpackConfig(webpackConfig)
}

const throwOnErrors = (errors, reporter) => {
  if (Array.isArray(errors) && errors.length > 0) {
    reporter.panicOnBuild(errors.toString())

    throw errors
  }
}

let resolveGraphQL = null
const graphqlPromise = new Promise((resolve) => {
  resolveGraphQL = resolve
})

exports.createPages = async ({ graphql }) => {
  resolveGraphQL(graphql)
}

exports.onCreatePage = async (args) => {
  const {
    page,
    reporter,
    actions: { createPage, deletePage },
  } = args

  const graphql = await graphqlPromise

  /**
   * Adds context to home page
   */
  if (
    page.path === '/' ||
    (page.context !== undefined &&
      typeof page.context.originalPath === 'string' &&
      page.context.originalPath === '/')
  ) {
    const home = await graphql(`
      query CMSContent {
        cmsHome {
          sections {
            name
            props
          }
        }
      }
    `)

    throwOnErrors(home.errors, reporter)

    if (!home.data.cmsHome) {
      return
    }

    const {
      data: {
        cmsHome: { sections },
      },
    } = home

    const {
      props: { searchParams },
    } = sections.find((x) => x.name === 'DynamicShelf')

    // Add context to home page

    deletePage(page)
    createPage({
      ...page,
      context: {
        ...page.context,
        ...searchParams,
      },
    })
  }

  /**
   * Adds context to search pages
   */
  if (!page.component.includes('/{StoreCollection.slug}/index.tsx')) {
    return
  }

  const {
    data: {
      storeCollection: {
        fields: { searchParams },
      },
    },
  } = await graphql(
    `
      query CollectionData {
        storeCollection(id: { eq: "${page.context.id}" }) {
          fields {
            searchParams {
              sort
              itemsPerPage
              selectedFacets {
                key
                value
              }
            }
          }
        }
      }
    `
  )

  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      ...searchParams,
    },
  })
}
