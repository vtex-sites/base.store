import React, { useEffect } from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'

import storeConfig from '../../store.config'

function Page() {
  useEffect(() => {
    window.location.href = storeConfig.loginUrl
  }, [])

  return (
    <>
      <GatsbySeo noindex nofollow />

      <div>loading...</div>
    </>
  )
}

export default Page
