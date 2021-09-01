import { graphql } from 'gatsby'
import React from 'react'
import ProductDetails from 'src/components/sections/ProductDetails'
import type { ProductViewFragment_ProductFragment } from '@generated/ProductViewFragment_product.graphql'
import type { ProductSeoFragment_SiteFragment } from '@generated/ProductSeoFragment_site.graphql'

import { useProduct } from './hooks/useProduct'
import Seo from './Seo'

interface Props {
  site: ProductSeoFragment_SiteFragment
  product: ProductViewFragment_ProductFragment
}

function View({ product: serverData, site }: Props) {
  /**
   * serverProduct data is stale and incomplete (because we SSRed it).
   * Let's use it's value as placeholder while we fetch the rest of the data
   * on the browser
   */
  const { data } = useProduct(
    { slug: serverData.slug! },
    { vtex: { product: serverData as any } }
  )

  const product = data?.vtex.product

  // useProductPixelEffect({ product: { id: product?.id ?? 'unknown' } })

  if (product == null) {
    return null
  }

  return (
    <>
      {/* Seo */}
      <Seo product={product} site={site} />

      {/* Visual Sections */}
      <ProductDetails product={product} />
    </>
  )
}

export const fragment = graphql`
  fragment ProductViewFragment_product on StoreProduct {
    id: productId
    slug: linkText

    ...ProductSeoFragment_product
    ...ProductDetailsFragment_product
  }
`

export default View
