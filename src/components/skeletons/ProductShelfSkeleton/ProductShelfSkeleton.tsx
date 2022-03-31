import { ITEMS_PER_SECTION } from 'src/constants'
import type { PropsWithChildren } from 'react'

import ProductCardSkeleton from '../ProductCardSkeleton'

interface Props {
  loading?: boolean
}

function ProductShelfSkeleton({
  children,
  loading = true,
}: PropsWithChildren<Props>) {
  return loading ? (
    <ul data-product-shelf className="layout__content">
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
