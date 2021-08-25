import { useGetThumborImageData } from '@vtex/gatsby-plugin-thumbor'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'
import imagesConf from 'src/images/config'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useProductLink } from 'src/sdk/product/useProductLink'

import type { ProductSummary_ProductFragment } from './__generated__/ProductSummary_product.graphql'

interface Props {
  product: ProductSummary_ProductFragment
}

const styles = {
  image: { width: '100%' },
}

const useImage = (src: string) => {
  const getImage = useGetThumborImageData()

  return useMemo(
    () =>
      getImage({
        baseUrl: src ?? '',
        ...imagesConf['product.summary'],
      }),
    [getImage, src]
  )
}

function ProductSummary({ product }: Props) {
  const { images, sellers, itemId } = product.items?.[0] ?? {}
  const { imageUrl: src, imageText: alt } = images?.[0] ?? {}
  const offer = sellers?.[0]?.commercialOffer
  const image = useImage(src ?? '')
  const linkProps = useProductLink({ slug: product.slug!, skuId: itemId! })
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
    <Link {...linkProps}>
      <GatsbyImage
        style={styles.image}
        image={image}
        alt={alt ?? ''}
        sizes="(max-width: 768px) 200px, 320px"
      />
      <div>{product.productName}</div>
      <button {...buyProps}>Add to cart</button>
    </Link>
  )
}

export const fragment = graphql`
  fragment ProductSummary_product on VTEX_Product {
    slug: linkText
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

export default ProductSummary
