import React from 'react'
import type { PropsWithChildren } from 'react'
import { ITEMS_PER_SECTION } from 'src/constants'

import ProductCardSkeleton from '../ProductCardSkeleton'

import 'src/components/sections/ProductShelf/product-shelf.scss'

interface Props {
  loading?: boolean
}

function ProductShelfSkeleton({
  children,
  loading = true,
}: PropsWithChildren<Props>) {
  return loading ? (
    <ul data-product-shelf className="grid-content">
      {Array.from({ length: ITEMS_PER_SECTION }, (_, index) => (
        <li key={String(index)}>
          <ProductCardSkeleton sectioned />
        </li>
      ))}
    </ul>
  ) : (
    <>{children}</>
  )
}

export default ProductShelfSkeleton
