import { graphql } from 'gatsby'
import React from 'react'
import Button from 'src/components/ui/Button'
import { Image } from 'src/components/ui/Image'
import SkuSelector from 'src/components/ui/SkuSelector'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProduct } from 'src/sdk/product/useProduct'
import type { ProductDetailsFragment_ProductFragment } from '@generated/graphql'

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
      image: productImages,
      offers: {
        offers: [{ price, listPrice, seller }],
      },
    },
  } = data

  const formattedPrice = useFormattedPrice(price)
  const formattedListPrice = useFormattedPrice(listPrice)

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
      image: productImages,
      name: variantName,
      sku,
    },
  })

  return (
    <div>
      <h2>{variantName}</h2>
      <Image
        src={productImages[0].url}
        variant="product.details"
        alt={productImages[0].alternateName}
        loading="eager"
      />
      <div className="line-through">{formattedListPrice}</div>
      <div className="min-h-[2rem]">{isValidating ? '' : formattedPrice}</div>
      <SkuSelector
        label="Size"
        variant="size"
        options={[
          { label: 'P', value: 'p' },
          { label: 'M', value: 'm' },
          { label: 'G', value: 'g' },
        ]}
      />
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
