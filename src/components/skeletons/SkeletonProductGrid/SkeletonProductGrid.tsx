import React from 'react'
import { ITEMS_PER_PAGE } from 'src/constants'

import SkeletonProductCard from '../SkeletonProductCard'

import 'src/components/product/ProductGrid/product-grid.scss'

interface Props {
  loading?: boolean
  children?: JSX.Element
}

function SkeletonProductGrid({ children, loading = true }: Props) {
  return loading ? (
    <ul className="product-grid">
      {Array.from({ length: ITEMS_PER_PAGE }, (_, index) => (
        <li key={String(index)}>
          <SkeletonProductCard bordered />
        </li>
      ))}
    </ul>
  ) : (
    children ?? null
  )
}

export default SkeletonProductGrid
