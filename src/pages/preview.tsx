import React from 'react'
import { linkResolver } from 'src/utils/linkResolver'
import { withPrismicPreviewResolver } from 'gatsby-plugin-prismic-previews'

function Page() {
  return <div>Loading Prismic Preview...</div>
}

export default withPrismicPreviewResolver(Page, [
  {
    repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME ?? '',
    linkResolver,
  },
])
