import React from 'react'
import type { PropsWithChildren } from 'react'
import { ITEMS_PER_SECTION } from 'src/constants'

import SkeletonProductCard from '../SkeletonProductCard'

import 'src/components/sections/ProductShelf/product-shelf.scss'

interface Props {
  loading?: boolean
}

function SkeletonProductShelf({
  children,
  loading = true,
}: PropsWithChildren<Props>) {
  return loading ? (
    <ul data-product-shelf className="grid-content">
      {Array.from({ length: ITEMS_PER_SECTION }, (_, index) => (
        <li key={String(index)}>
          <SkeletonProductCard sectioned />
        </li>
      ))}
    </ul>
  ) : (
    <>{children}</>
  )
}

export default SkeletonProductShelf
