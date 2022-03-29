import React, { lazy, Suspense } from 'react'

import type { TilesProps } from './ProductTiles'

const Component = lazy(
  () =>
    import(
      /* webpackMode: "eager" */
      './ProductTiles'
    )
)

function Section(props: TilesProps) {
  return (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  )
}

export default Section
