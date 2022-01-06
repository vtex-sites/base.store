import { graphql } from 'gatsby'
import React, { useEffect } from 'react'
import Button from 'src/components/ui/Button'
import { Image } from 'src/components/ui/Image'
import SkuSelector from 'src/components/ui/SkuSelector'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProduct } from 'src/sdk/product/useProduct'
import type { ProductDetailsFragment_ProductFragment } from '@generated/graphql'
import type { CurrencyCode, ViewItemEvent } from '@faststore/sdk'
import { sendAnalyticsEvent, useSession } from '@faststore/sdk'
import type { AnalyticsItem } from 'src/sdk/analytics/types'

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
      gtin,
      name: variantName,
      brand,
      isVariantOf,
      image: productImages,
      offers: {
        offers: [{ price, listPrice, seller }],
      },
    },
  } = data

  const { currency } = useSession()

  useEffect(() => {
    sendAnalyticsEvent<ViewItemEvent<AnalyticsItem>>({
      name: 'view_item',
      params: {
        currency: currency.code as CurrencyCode,
        value: price,
        items: [
          {
            item_id: isVariantOf.productGroupID,
            item_name: isVariantOf.name,
            item_brand: brand.name,
            item_variant: sku,
            price,
            discount: listPrice - price,
            currency: currency.code as CurrencyCode,
            item_variant_name: variantName,
            product_reference_id: gtin,
          },
        ],
      },
    })
  }, [
    isVariantOf.productGroupID,
    isVariantOf.name,
    brand.name,
    sku,
    price,
    listPrice,
    currency.code,
    variantName,
    gtin,
  ])

  const formattedPrice = useFormattedPrice(price)
  const formattedListPrice = useFormattedPrice(listPrice)

  const buyProps = useBuyButton({
    id,
    brand,
    isVariantOf,
    price,
    listPrice,
    seller,
    quantity: 1,
    gtin,
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
        baseUrl={productImages[0].url}
        sourceWidth={720}
        aspectRatio={1}
        width={720}
        breakpoints={[250, 360, 480, 720]}
        layout="constrained"
        backgroundColor="#f0f0f0"
        options={{
          fitIn: true,
        }}
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
