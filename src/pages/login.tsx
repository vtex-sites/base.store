import React, { useEffect } from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'

import * as storeConfig from '../../store.config'

const { loginUrl } = storeConfig

function Page() {
  useEffect(() => {
    window.location.href = loginUrl
  }, [])

  return <GatsbySeo noindex nofollow />
}

export default Page
