import React, { lazy, Suspense } from 'react'

import type { BannerTextProps } from './BannerText'

const Component = lazy(
  () =>
    import(
      /* webpackMode: "eager" */
      './BannerText'
    )
)

function Section(props: BannerTextProps) {
  return (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  )
}

export default Section
