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

// const useSku = (product: Props['product']) => {
//   const [skuId] = useSkuId()

//   return useMemo(() => {
//     const maybeSku =
//       skuId && product.items?.find((item) => item?.itemId === skuId)

//     return maybeSku || product.items?.[0]
//   }, [product.items, skuId])
// }

function ProductDetails({ product }: Props) {
  const {
    name,
    image: [img],
  } = product

  const image = useImage(img.url, 'product.details')

  return (
    <div>
      <h1>{name}</h1>
      <GatsbyImage image={image} alt={img.alternateName} loading="eager" />
    </div>
  )
  // const sku = useSku(product)
  // const { images, sellers, itemId } = sku ?? {}
  // const [seller] = sellers!
  // const offer = seller!.commercialOffer
  // const buyProps = useBuyButton(
  //   offer && {
  //     name: product.name!,
  //     price: offer.spotPrice!,
  //     listPrice: offer.listPrice!,
  //     quantity: 1,
  //     giftQuantity: 0,
  //     seller: seller!.sellerId!,
  //     skuId: itemId!,
  //     image: {
  //       src: imageSrc,
  //       alt: imageAlt,
  //     },
  //   }
  // )

  // return (
  //   <>
  //     <h1>{product.name}</h1>
  //     <GatsbyImage image={image} alt={imageAlt} loading="eager" />
  //     <button {...buyProps}>Add to cart</button>
  //   </>
  // )
}

export const fragment = graphql`
  fragment ProductDetailsFragment_product on StoreProduct {
    name

    image {
      url
      alternateName
    }

    # items {
    #   itemId
    #   images {
    #     imageUrl
    #     imageText
    #   }
    #   sellers {
    #     sellerId
    #     commercialOffer: commertialOffer {
    #       spotPrice
    #       listPrice: ListPrice
    #     }
    #   }
    # }
  }
`

export default ProductDetails
