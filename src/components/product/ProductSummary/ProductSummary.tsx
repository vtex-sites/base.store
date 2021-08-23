import { useGetThumborImageData } from '@vtex/gatsby-plugin-thumbor'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'
import imagesConf from 'src/images/config'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'

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
  const { images, sellers } = product.items?.[0] ?? {}
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
    <Link to={`/${product.slug}/p`}>
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
