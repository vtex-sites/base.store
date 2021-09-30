import React from 'react'
import Render from 'src/cms'
import Carousel from 'src/components/sections/Carousel'
import Shelf from 'src/components/sections/Shelf'
import type { Props as PageProps } from 'src/pages/index'

import Seo from './Seo'

export type Props = PageProps

const components = {
  Carousel,
  DynamicShelf: Shelf,
}

function View(props: Props) {
  const {
    data: { cmsHome },
  } = props

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
      <Render sections={cmsHome?.sections ?? []} components={components} />
    </>
  )
}

export default View
