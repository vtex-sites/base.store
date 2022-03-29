import React, { lazy, Suspense } from 'react'

import type { ProductShelfProps } from './ProductShelf'

const Component = lazy(
  () =>
    import(
      /* webpackMode: "eager" */
      './ProductShelf'
    )
)

function Section(props: ProductShelfProps) {
  return (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  )
}

export default Section
