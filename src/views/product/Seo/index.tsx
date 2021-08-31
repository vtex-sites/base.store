import React from 'react'
import { graphql } from 'gatsby'
import {
  BreadcrumbJsonLd,
  GatsbySeo,
  ProductJsonLd,
} from 'gatsby-plugin-next-seo'
import type { ProductSeoFragment_SiteFragment } from '@generated/ProductSeoFragment_site.graphql'
import type { ProductSeoFragment_ProductFragment } from '@generated/ProductSeoFragment_product.graphql'

import { useMetadata } from './hooks/useMetadata'
import { useBreadcrumbJsonLd } from './hooks/useBreadcrumbJsonLd'
import { useProductJsonLd } from './hooks/useProductJsonLd'

export interface Props {
  site: ProductSeoFragment_SiteFragment
  product: ProductSeoFragment_ProductFragment
}

function Seo(props: Props) {
  const metadata = useMetadata(props)
  const breadcrumbJson = useBreadcrumbJsonLd(props)
  const productJson = useProductJsonLd(props)

  return (
    <>
      <GatsbySeo {...metadata} defer />
      <BreadcrumbJsonLd {...breadcrumbJson} defer />
      {productJson && <ProductJsonLd {...productJson} defer />}
    </>
  )
}

export const fragment = graphql`
  fragment ProductSeoFragment_site on Site {
    siteMetadata {
      title
      description
      titleTemplate
      siteUrl
    }
  }

  fragment ProductSeoFragment_product on StoreProduct {
    titleTag
    metaTagDescription

    brand
    linkText
    productName
    description

    categoryTree {
      name
      href
    }

    items {
      ean
      name
      itemId
      images {
        imageUrl
        imageText
      }
      videos {
        videoUrl
      }
      sellers {
        commercialOffer: commertialOffer {
          price: Price
          listPrice: ListPrice
          availableQuantity: AvailableQuantity
          priceValidUntil: PriceValidUntil
          spotPrice
        }
      }
    }
  }
`

export default Seo
