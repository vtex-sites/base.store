import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useImage } from 'src/sdk/image/useImage'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import type { ProductDetailsFragment_ProductFragment } from '@generated/ProductDetailsFragment_product.graphql'
import Button from 'src/components/ui/Button'

interface Props {
  product: ProductDetailsFragment_ProductFragment
}

const styles = {
  listPrice: { textDecoration: 'line-through' },
}

function ProductDetails({ product }: Props) {
  const {
    id,
    name,
    image: [img],
    offers: {
      offers: [
        {
          price,
          listPrice,
          seller: { identifier },
        },
      ],
    },
  } = product

  const image = useImage(img.url, 'product.details')
  const buyProps = useBuyButton({
    name,
    price,
    listPrice,
    quantity: 1,
    giftQuantity: 0,
    seller: identifier,
    skuId: id,
    image: {
      src: img.url,
      alt: img.alternateName,
    },
  })

  return (
    <div>
      <h2>{name}</h2>
      <GatsbyImage image={image} alt={img.alternateName} loading="eager" />
      <div style={styles.listPrice}>{useFormattedPrice(listPrice)}</div>
      <div>{useFormattedPrice(price)}</div>
      <Button {...buyProps}>Add to cart</Button>
    </div>
  )
}

export const fragment = graphql`
  fragment ProductDetailsFragment_product on StoreProduct {
    id: productID
    name

    image {
      url
      alternateName
    }

    offers {
      offers {
        price
        listPrice
        seller {
          identifier
        }
      }
    }
  }
`

export default ProductDetails
