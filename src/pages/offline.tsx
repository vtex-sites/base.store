import React from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import Layout from 'src/views/Layout'

function Page() {
  return (
    <Layout>
      <GatsbySeo noindex nofollow />

      <div>TODO</div>
    </Layout>
  )
}

export default Page
