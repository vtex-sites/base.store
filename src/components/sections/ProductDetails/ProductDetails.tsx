import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import Button from 'src/components/ui/Button'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useImage } from 'src/sdk/image/useImage'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import type { ProductDetailsFragment_ProductFragment } from '@generated/ProductDetailsFragment_product.graphql'

interface Props {
  product: ProductDetailsFragment_ProductFragment
}

const styles = {
  listPrice: { textDecoration: 'line-through' },
}

function ProductDetails({ product }: Props) {
  const {
    id,
    isVariantOf: { name },
    name: skuName,
    brand: { name: brandName },
    sku,
    image: [img],
    offers: {
      offers: [{ price, listPrice, seller }],
    },
  } = product

  const image = useImage(img.url, 'product.details')
  const buyProps = useBuyButton({
    id,
    name,
    brand: brandName,
    price,
    listPrice,
    seller,
    quantity: 1,
    itemOffered: {
      image: [img],
      name: skuName,
      sku,
    },
  })

  return (
    <div>
      <h2>{skuName}</h2>
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
    sku

    isVariantOf {
      name
    }

    image {
      url
      alternateName
    }

    brand {
      name
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
