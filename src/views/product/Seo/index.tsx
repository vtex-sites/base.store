import React from 'react'
import { ProductSEO } from '@vtex/gatsby-theme-store'
import { graphql, useStaticQuery } from 'gatsby'
import type { FC } from 'react'

import type { StoreProductPageSeoQueryQuery } from './__generated__/StoreProductPageSEOQuery.graphql'
import type { SeoFragment_ProductFragment } from './__generated__/SeoFragment_product.graphql'

interface Props {
  product: SeoFragment_ProductFragment
}

const Seo: FC<Props> = ({ product }) => {
  const {
    cmsSeo: {
      seo: { siteMetadata },
    },
    site: {
      siteMetadata: { siteUrl },
    },
  }: any = useStaticQuery<StoreProductPageSeoQueryQuery>(
    graphql`
      query StoreProductPageSEOQuery {
        site {
          siteMetadata {
            siteUrl
          }
        }
        cmsSeo {
          seo {
            siteMetadata {
              title
              description
              titleTemplate
            }
          }
        }
      }
    `
  )

  return (
    <ProductSEO
      siteMetadata={{ ...siteMetadata, siteUrl }}
      product={product as any}
    />
  )
}

export const fragment = graphql`
  fragment SeoFragment_product on StoreProduct {
    id: productId
    titleTag
    metaTagDescription
    productName
    description
    brand
    linkText
    items {
      itemId
      ean
      images {
        imageUrl
      }
      sellers {
        commercialOffer: commertialOffer {
          spotPrice
          availableQuantity: AvailableQuantity
          priceValidUntil: PriceValidUntil
        }
      }
    }
    categoryTree {
      href
      name
    }
  }
`

export default Seo
