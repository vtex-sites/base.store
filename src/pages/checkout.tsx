import React, { useEffect } from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import storeConfig from 'src/store.config'

function Page() {
  useEffect(() => {
    window.location.href = storeConfig.checkoutUrl
  }, [])

  return (
    <>
      <GatsbySeo noindex nofollow />

      <div>loading...</div>
    </>
  )
}

export default Page
