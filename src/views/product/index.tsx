import { graphql } from 'gatsby'
import React, { lazy, Suspense, SuspenseList } from 'react'

import { useProduct } from './hooks/useProduct'
import type { ProductSeoFragment_SiteFragment } from './Seo/__generated__/ProductSeoFragment_site.graphql'
import type { ProductViewFragment_ProductFragment } from './__generated__/ProductViewFragment_product.graphql'

const Seo = lazy(
  () =>
    import(
      /* webpackMode: "eager" */
      './Seo'
    )
)

const ProductDetails = lazy(
  () =>
    import(
      /* webpackMode: "eager" */
      'src/components/sections/ProductDetails'
    )
)

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
    { vtex: { product: serverData } }
  )

  const product = data?.vtex.product

  // useProductPixelEffect({ product: { id: product?.id ?? 'unknown' } })

  if (product == null) {
    return null
  }

  return (
    <SuspenseList>
      {/* Seo */}
      <Suspense fallback={null}>
        <Seo product={product} site={site} />
      </Suspense>

      {/* Visual Sections */}
      <Suspense fallback={null}>
        <ProductDetails product={product} />
      </Suspense>
    </SuspenseList>
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
