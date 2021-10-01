import React from 'react'
import type { Props as PageProps } from 'src/pages/index'

import Seo from './Seo'

export type Props = PageProps

function View(props: Props) {
  // Send event to analytics
  // usePixelSendEvent(() => {
  //   const event: PageViewData = {
  //     pageType: 'home',
  //     pageUrl: window.location.href,
  //     pageTitle: document.title,
  //     referrer: '',
  //     accountName: process.env.GATSBY_STORE_ID!,
  //   }

  //   return { type: 'vtex:pageView', data: event }
  // })

  const title = props.data.site?.siteMetadata?.title ?? ''

  return (
    <>
      {/* Seo Components */}
      <Seo {...props} title={title} />

      {/* Visual Sections */}
      <h1>{title}</h1>
    </>
  )
}

export default View
