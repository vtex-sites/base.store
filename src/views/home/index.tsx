import React, { lazy, Suspense, SuspenseList } from 'react'
import type { Props as PageProps } from 'src/pages/index'

const Seo = lazy(
  () =>
    import(
      /* webpackMode: "eager" */
      './Seo'
    )
)

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

  return (
    <SuspenseList>
      {/* Seo Components */}
      <Suspense fallback={null}>
        <Seo {...props} />
      </Suspense>

      {/* Visual Sections */}
      <Suspense fallback={null}>
        <div>TODO</div>
      </Suspense>
    </SuspenseList>
  )
}

export default View
