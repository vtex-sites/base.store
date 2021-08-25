import { useGetThumborImageData } from '@vtex/gatsby-plugin-thumbor'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'
import imagesConf from 'src/images/config'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useSkuId } from 'src/sdk/product/useSkuId'
import type { ProductDetailsFragment_ProductFragment } from 'src/views/product/__generated__/ProductViewFragment_product.graphql'

interface Props {
  product: ProductDetailsFragment_ProductFragment
}

const useImage = (src: string) => {
  const getImage = useGetThumborImageData()

  return useMemo(
    () =>
      getImage({
        baseUrl: src ?? '',
        ...imagesConf['product.details'],
      }),
    [getImage, src]
  )
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
  const { images, sellers } = sku ?? {}
  const { imageUrl: src, imageText: alt } = images?.[0] ?? {}
  const offer = sellers?.[0]?.commercialOffer
  const image = useImage(src ?? '')
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
      <GatsbyImage image={image} alt={alt ?? ''} loading="eager" />
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
        commercialOffer: commertialOffer {
          spotPrice
          listPrice: ListPrice
        }
      }
    }
  }
`

export default ProductDetails
