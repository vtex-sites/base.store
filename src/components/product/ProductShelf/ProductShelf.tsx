import React, { useMemo } from 'react'
import { useProductsQuery } from 'src/sdk/product/useProductsQuery'

import ProductSummary from '../ProductSummary'

import './product-shelf.scss'

function ProductShelf() {
  const perPage = 10
  const productList = useProductsQuery({
    first: perPage,
    after: (perPage * 1).toString(),
    sort: 'score_desc',
    term: '',
    selectedFacets: [{ key: 'category-1', value: 'office' }],
  })

  const products = useMemo(
    () => productList?.edges.map((edge) => edge.node),
    [productList]
  )

  if (products == null) {
    return null
  }

  return (
    <ul data-product-shelf>
      {products.slice(0, 5).map((product, idx) => (
        <li key={`${product.id}`}>
          <ProductSummary product={product} index={idx + 1} />
        </li>
      ))}
    </ul>
  )
}

export default ProductShelf
