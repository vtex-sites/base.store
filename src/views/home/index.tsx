import React from 'react'
import { GatsbySeo, JsonLd } from 'gatsby-plugin-next-seo'
import { usePixelSendEvent } from '@vtex/gatsby-theme-store'
import type { Props } from 'src/pages/index'
import type { PageViewData } from '@vtex/gatsby-theme-store'

import { useMetadata } from './hooks/useMetadata'
import { useSiteLinksSearchBoxJsonLd } from './hooks/useSiteLinksSearchBoxJsonLd'

function View(props: Props) {
  const metadata = useMetadata(props)
  const siteLinksSearchBox = useSiteLinksSearchBoxJsonLd(props)

  // Send event to analytics
  usePixelSendEvent(() => {
    const event: PageViewData = {
      pageType: 'home',
      pageUrl: window.location.href,
      pageTitle: document.title,
      referrer: '',
      accountName: process.env.GATSBY_STORE_ID!,
    }

    return { type: 'vtex:pageView', data: event }
  })

  return (
    <>
      {/* Seo Components */}
      <GatsbySeo {...metadata} defer />
      <JsonLd json={siteLinksSearchBox} defer />

      {/* Visual Sections */}
      <div>TODO</div>
    </>
  )
}

export default View
