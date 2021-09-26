import React from 'react'
import type { Props as PageProps } from 'src/pages/index'
import { BuilderComponent } from '@builder.io/react'

import Seo from './Seo'

export type Props = PageProps

function View(props: Props) {
  const { data } = props
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

  return (
    <>
      {/* Seo Components */}
      <Seo {...props} />

      {/* Visual Sections */}
      <BuilderComponent
        model="home"
        content={data?.allBuilderModels.oneHome?.content}
      />
    </>
  )
}

export default View
