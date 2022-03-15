import React from 'react'
import type { PropsWithChildren } from 'react'
import { ITEMS_PER_SECTION } from 'src/constants'
import * as style from 'src/components/sections/ProductShelf/product-shelf.module.scss'

import ProductCardSkeleton from '../ProductCardSkeleton'

interface Props {
  loading?: boolean
}

function ProductShelfSkeleton({
  children,
  loading = true,
}: PropsWithChildren<Props>) {
  return loading ? (
    <ul className={`${style.container} / grid-content`}>
      {Array.from({ length: ITEMS_PER_SECTION }, (_, index) => (
        <li key={String(index)} className={style.item}>
          <ProductCardSkeleton sectioned />
        </li>
      ))}
    </ul>
  ) : (
    <>{children}</>
  )
}

export default ProductShelfSkeleton
