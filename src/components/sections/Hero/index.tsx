import React, { lazy, Suspense } from 'react'

import type { HeroProps } from './Hero'

const Component = lazy(
  () =>
    import(
      /* webpackMode: "eager" */
      './Hero'
    )
)

function Section(props: HeroProps) {
  return (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  )
}

export default Section
