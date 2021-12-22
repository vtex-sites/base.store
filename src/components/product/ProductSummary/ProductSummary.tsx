import { graphql, Link } from 'gatsby'
import React, { useMemo } from 'react'
import Button from 'src/components/ui/Button'
import DiscountBadge from 'src/components/ui/DiscountBadge'
import { Image } from 'src/components/ui/Image'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProductLink } from 'src/sdk/product/useProductLink'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import { ShoppingCart as ShoppingCartIcon } from 'phosphor-react'
import {
  Card as UICard,
  CardImage as UICardImage,
  CardContent as UICardContent,
  CardActions as UICardActions,
} from '@faststore/ui'

import './product-summary.scss'

interface Props {
  product: ProductSummary_ProductFragment
  index: number
}

function ProductSummary({ product, index }: Props) {
  const {
    id,
    sku,
    gtin: referenceId,
    name: variantName,
    brand: { name: brandName },
    isVariantOf: { name, productGroupID: productId },
    image: [img],
    offers: { lowPrice: spotPrice, offers },
  } = product

  const { listPrice, seller } = useMemo(() => {
    const lowestPriceOffer = offers.find((x) => x.price === spotPrice)

    if (!lowestPriceOffer) {
      console.error(
        'Could not find the lowest price product offer. Showing the first offer provided.'
      )

      return offers[0]
    }

    return lowestPriceOffer
  }, [spotPrice, offers])

  const linkProps = useProductLink({ product, index })
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
    <UICard className="product-summary">
      <UICardImage>
        <Image
          src={img.url}
          variant="product.summary"
          alt={img.alternateName}
          sizes="(max-width: 768px) 200px, 320px"
        />
      </UICardImage>
      <UICardContent aria-label="">
        <h3 className="text-body">
          <Link {...linkProps}>{name}</Link>
        </h3>
        <div className="product-summary__prices">
          <span
            className="product-summary__prices-list / text-body-small"
            data-testid="list-price"
            data-value={listPrice}
          >
            {useFormattedPrice(listPrice)}
          </span>
          <span
            className="product-summary__prices-spot / text-body"
            data-testid="price"
            data-value={spotPrice}
          >
            {useFormattedPrice(spotPrice)}
          </span>
        </div>
        <DiscountBadge small listPrice={listPrice} spotPrice={spotPrice} />
      </UICardContent>
      <UICardActions>
        <Button {...buyProps} title="Add to cart">
          <ShoppingCartIcon size={18} weight="bold" />
          Add
        </Button>
      </UICardActions>
    </UICard>
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
