import { graphql, Link } from 'gatsby'
import React, { useMemo } from 'react'
import DiscountBadge from 'src/components/ui/DiscountBadge'
import Price from 'src/components/ui/Price'
import { Image } from 'src/components/ui/Image'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProductLink } from 'src/sdk/product/useProductLink'
import type { ProductTile_ProductFragment } from '@generated/graphql'
import {
  Card as UICard,
  CardImage as UICardImage,
  CardContent as UICardContent,
} from '@faststore/ui'

import './product-tile.scss'

interface Props {
  product: ProductTile_ProductFragment
  index: number
}

function ProductTile({ product, index }: Props) {
  const {
    isVariantOf: { name },
    image: [img],
    offers: { lowPrice: spotPrice, offers },
  } = product

  const { listPrice } = useMemo(() => {
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

  return (
    <UICard className="product-tile">
      <UICardImage>
        <Image
          src={img.url}
          variant="product.summary"
          alt={img.alternateName}
          sizes="(max-width: 768px) 200px, 320px"
        />
      </UICardImage>
      <UICardContent>
        <div className="product-tile__info">
          <h3 className="product-tile__title">
            <Link {...linkProps} title={name}>
              {name}
            </Link>
          </h3>
          <div className="product-tile__prices">
            <Price
              value={listPrice}
              formatter={useFormattedPrice}
              testId="list-price"
              data-value={listPrice}
              variant="listing"
              classes="text-body-small"
              aria-label={`Original price: ${useFormattedPrice(listPrice)}`}
            />
            <Price
              value={spotPrice}
              formatter={useFormattedPrice}
              testId="price"
              data-value={spotPrice}
              variant="spot"
              classes="text-body"
              aria-label={`Sale price: ${useFormattedPrice(spotPrice)}`}
            />
          </div>
        </div>
        <DiscountBadge small listPrice={listPrice} spotPrice={spotPrice} />
      </UICardContent>
    </UICard>
  )
}

export const fragment = graphql`
  fragment ProductTile_product on StoreProduct {
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

export default ProductTile
