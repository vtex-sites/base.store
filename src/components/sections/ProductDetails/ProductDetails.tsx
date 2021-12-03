import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import Button from 'src/components/ui/Button'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useImage } from 'src/sdk/image/useImage'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import type { ProductDetailsFragment_ProductFragment } from '@generated/graphql'
import { useProduct } from 'src/sdk/product/useProduct'

interface Props {
  product: ProductDetailsFragment_ProductFragment
}

function ProductDetails({ product: staleProduct }: Props) {
  // Stale while revalidate the product for fetching the new price etc
  const { data, isValidating } = useProduct(staleProduct.id, {
    product: staleProduct,
  })

  if (!data) {
    throw new Error('NotFound')
  }

  const {
    product: {
      id,
      sku,
      gtin: referenceId,
      name: variantName,
      brand: { name: brandName },
      isVariantOf: { name, productGroupID: productId },
      image: [img],
      offers: {
        offers: [{ price, listPrice, seller }],
      },
    },
  } = data

  const formattedPrice = useFormattedPrice(price)
  const formattedListPrice = useFormattedPrice(listPrice)
  const image = useImage(img.url, 'product.details')
  const buyProps = useBuyButton({
    id,
    name,
    brand: brandName,
    price,
    listPrice,
    seller,
    quantity: 1,
    referenceId,
    productId,
    itemOffered: {
      image: [img],
      name: variantName,
      sku,
    },
  })

  return (
    <div>
      <h2>{variantName}</h2>
      <GatsbyImage image={image} alt={img.alternateName} loading="eager" />
      <div className="line-through">{formattedListPrice}</div>
      <div className="min-h-[2rem]">{isValidating ? '' : formattedPrice}</div>
      <Button {...buyProps} disabled={isValidating}>
        Add to cart
      </Button>
    </div>
  )
}

export const fragment = graphql`
  fragment ProductDetailsFragment_product on StoreProduct {
    id: productID
    sku
    name
    gtin

    isVariantOf {
      productGroupID
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
