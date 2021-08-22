import { useThumborImageData } from '@vtex/gatsby-plugin-thumbor'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import imagesConf from 'src/images/config'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import type { ProductDetailsFragment_ProductFragment } from 'src/views/product/__generated__/ProductViewFragment_product.graphql'

interface Props {
  product: ProductDetailsFragment_ProductFragment
}

function ProductDetails({ product }: Props) {
  const { images, sellers } = product.items?.[0] ?? {}
  const { imageUrl: src, imageText: alt } = images?.[0] ?? {}
  const offer = sellers?.[0]?.commercialOffer

  const image = useThumborImageData({
    baseUrl: src ?? '',
    ...imagesConf['product.details'],
  })

  const buyProps = useBuyButton(
    offer && {
      id: product.id!,
      price: offer.spotPrice!,
      listPrice: offer.listPrice!,
      quantity: {
        selling: 1,
        gift: 0,
      },
    }
  )

  return (
    <>
      <h1>{product.productName}</h1>
      <GatsbyImage image={image} alt={alt ?? ''} />
      <button {...buyProps}>Add to cart</button>
    </>
  )
}

export const fragment = graphql`
  fragment ProductDetailsFragment_product on StoreProduct {
    id: productId
    productName

    items {
      images {
        imageUrl
        imageText
      }
      sellers {
        commercialOffer: commertialOffer {
          spotPrice
          listPrice: ListPrice
        }
      }
    }
  }
`

export default ProductDetails
