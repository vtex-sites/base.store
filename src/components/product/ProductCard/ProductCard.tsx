import { graphql, Link } from 'gatsby'
import React, { useMemo } from 'react'
import Button from 'src/components/ui/Button'
import DiscountBadge from 'src/components/ui/DiscountBadge'
import { Image } from 'src/components/ui/Image'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProductLink } from 'src/sdk/product/useProductLink'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

interface Props {
  product: ProductSummary_ProductFragment
  index: number
  className?: string
}

function ProductCard({ product, index, className }: Props) {
  const {
    id,
    sku,
    gtin,
    name: variantName,
    brand,
    isVariantOf,
    isVariantOf: { name },
    image: [img],
    offers: { lowPrice: spotPrice, offers },
  } = product

  const selectedOffer = useMemo(() => {
    const lowestPriceOffer = offers.findIndex((x) => x.price === spotPrice)

    if (lowestPriceOffer === -1) {
      console.error(
        'Could not find the lowest price product offer. Showing the first offer provided.'
      )

      return 0
    }

    return lowestPriceOffer
  }, [spotPrice, offers])

  const { listPrice, seller } = offers[selectedOffer]

  const linkProps = useProductLink({ product, selectedOffer, index })
  const buyProps = useBuyButton({
    id,
    brand,
    price: spotPrice,
    listPrice,
    seller,
    quantity: 1,
    isVariantOf,
    gtin,
    itemOffered: {
      name: variantName,
      image: [img],
      sku,
    },
  })

  return (
    <Link {...linkProps} className={className}>
      <Image
        className="w-full"
        baseUrl={img.url}
        sourceWidth={480}
        aspectRatio={1}
        width={360}
        breakpoints={[250, 360, 480]}
        layout="constrained"
        backgroundColor="#f0f0f0"
        options={{
          fitIn: true,
        }}
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

export default ProductCard
