import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useImage } from 'src/sdk/image/useImage'
import { useSkuId } from 'src/sdk/product/useSkuId'
import type { ProductDetailsFragment_ProductFragment } from '@generated/ProductDetailsFragment_product.graphql'

interface Props {
  product: ProductDetailsFragment_ProductFragment
}

const useSku = (product: Props['product']) => {
  const [skuId] = useSkuId()

  return useMemo(() => {
    const maybeSku =
      skuId && product.items?.find((item) => item?.itemId === skuId)

    return maybeSku || product.items?.[0]
  }, [product.items, skuId])
}

function ProductDetails({ product }: Props) {
  const sku = useSku(product)
  const { images, sellers, itemId } = sku ?? {}
  const { imageUrl: src, imageText: alt } = images?.[0] ?? {}
  const imageSrc = src ?? ''
  const imageAlt = alt ?? ''
  const [seller] = sellers!
  const offer = seller!.commercialOffer
  const image = useImage(imageSrc, 'product.details')
  const buyProps = useBuyButton(
    offer && {
      name: product.productName!,
      price: offer.spotPrice!,
      listPrice: offer.listPrice!,
      quantity: 1,
      giftQuantity: 0,
      seller: seller!.sellerId!,
      skuId: itemId!,
      image: {
        src: imageSrc,
        alt: imageAlt,
      },
    }
  )

  return (
    <>
      <h1>{product.productName}</h1>
      <GatsbyImage image={image} alt={imageAlt} loading="eager" />
      <button {...buyProps}>Add to cart</button>
    </>
  )
}

export const fragment = graphql`
  fragment ProductDetailsFragment_product on StoreProduct {
    id: productId
    productName

    items {
      itemId
      images {
        imageUrl
        imageText
      }
      sellers {
        sellerId
        commercialOffer: commertialOffer {
          spotPrice
          listPrice: ListPrice
        }
      }
    }
  }
`

export default ProductDetails
