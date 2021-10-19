import { graphql } from 'gatsby'
import React from 'react'
import ProductDetails from 'src/components/sections/ProductDetails'
import type {
  BrowserProductQueryQuery,
  ProductSeoFragment_SiteFragment,
  ProductViewFragment_ProductFragment,
} from '@generated/graphql'

import { useProduct } from './hooks/useProduct'
import Seo from './Seo'

interface Props {
  site: ProductSeoFragment_SiteFragment
  product: ProductViewFragment_ProductFragment
}

function View({ product: serverData, site }: Props) {
  const { data } = useProduct(
    serverData.id,
    { product: serverData as unknown as BrowserProductQueryQuery['product'] } // TODO: Fix this typings
  )

  const product = data?.product
  const title = data?.product.seo.title ?? site?.siteMetadata?.title ?? ''

  // useProductPixelEffect({ product: { id: product?.id ?? 'unknown' } })

  if (product == null) {
    return null
  }

  return (
    <>
      {/* Seo */}
      <Seo title={title} product={product} site={site} />

      {/* Visual Sections */}
      <h1 className="absolute top-[-100px]">{title}</h1>

      <ProductDetails product={product} />
    </>
  )
}

export const fragment = graphql`
  fragment ProductViewFragment_product on StoreProduct {
    id: productID
    slug

    ...ProductSeoFragment_product
    ...ProductDetailsFragment_product
  }
`

export default View
