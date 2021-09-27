import React, { useEffect } from 'react'
import { linkResolver } from 'src/utils/linkResolver'
import { withPrismicPreviewResolver } from 'gatsby-plugin-prismic-previews'

function Page() {
  useEffect(() => {
    window.location.href = '/'
  }, [])

  return <div>loading...</div>
}

export default withPrismicPreviewResolver(Page, [
  {
    repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME ?? '',
    linkResolver,
  },
])
