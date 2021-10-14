import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'
import Button from 'src/components/ui/Button'
import DiscountBadge from 'src/components/ui/DiscountBadge'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useImage } from 'src/sdk/image/useImage'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProductLink } from 'src/sdk/product/useProductLink'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import type { ViewItemData } from '@vtex/store-sdk'

interface Props {
  product: ProductSummary_ProductFragment
}

function ProductSummary({ product }: Props) {
  const productOptions: ViewItemData = {
    value: product?.offers?.offers[0]?.price,
    items: [
      {
        item_id: product?.id,
        item_name: product?.name,
        index: 0,
        price: product?.offers?.offers[0]?.price,
        discount:
          product?.offers?.offers[0]?.listPrice -
          product?.offers?.offers[0]?.price,
        item_brand: product?.brand?.name,
        item_variant: product?.isVariantOf?.name,
      },
    ],
  }

  const {
    id,
    slug,
    sku,
    gtin: referenceId,
    name: variantName,
    brand: { name: brandName },
    isVariantOf: { name, productGroupID: productId },
    image: [img],
    offers: { lowPrice: spotPrice, offers },
  } = product

  const { listPrice, seller } = useMemo(
    () => offers.find((x) => x.price === spotPrice)!,
    [spotPrice, offers]
  )

  const linkProps = useProductLink({ slug, product: productOptions })
  const image = useImage(img.url, 'product.summary')
  const buyProps = useBuyButton({
    id,
    name,
    brand: brandName,
    price: spotPrice,
    listPrice,
    seller,
    quantity: 1,
    referenceId,
    productId,
    itemOffered: {
      name: variantName,
      image: [img],
      sku,
    },
  })

  return (
    <Link {...linkProps}>
      <GatsbyImage
        className="w-full"
        image={image}
        alt={img.alternateName}
        sizes="(max-width: 768px) 200px, 320px"
      />
      <div>{name}</div>
      <div className="flex justify-between">
        <span
          data-testid="list-price"
          data-value={listPrice}
          className="line-through"
        >
          {useFormattedPrice(listPrice)}
        </span>
        <span data-testid="price" data-value={spotPrice}>
          {useFormattedPrice(spotPrice)}
        </span>
        <DiscountBadge listPrice={listPrice} spotPrice={spotPrice} />
      </div>
      <Button {...buyProps}>Add to cart</Button>
    </Link>
  )
}

export const fragment = graphql`
  fragment ProductSummary_product on StoreProduct {
    id: productID
    slug
    sku
    brand {
      brandName: name
    }
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
      lowPrice
      offers {
        price
        listPrice
        quantity
        seller {
          identifier
        }
      }
    }
  }
`

export default ProductSummary
