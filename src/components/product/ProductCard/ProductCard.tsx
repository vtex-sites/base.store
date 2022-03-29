import {
  Card as UICard,
  CardActions as UICardActions,
  CardContent as UICardContent,
  CardImage as UICardImage,
} from '@faststore/ui'
import { graphql, Link } from 'gatsby'
import React, { memo } from 'react'
import { Badge, DiscountBadge } from 'src/components/ui/Badge'
import { Image } from 'src/components/ui/Image'
import Price from 'src/components/ui/Price'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProductLink } from 'src/sdk/product/useProductLink'
import type { ReactNode } from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

import './product-card.scss'

type Variant = 'wide' | 'default'

interface Props {
  product: ProductSummary_ProductFragment
  index: number
  bordered?: boolean
  variant?: Variant
  aspectRatio?: number
  buyButton?: ReactNode
}

const imgOptions = {
  sourceWidth: 1024,
  backgroundColor: '#f0f0f0',
  layout: 'constrained' as const,
  loading: 'lazy' as const,
  sizes: '(max-width: 768px) 25vw, 30vw',
  breakpoints: [360, 480, 720, 1024],
}

function ProductCard({
  product,
  index,
  variant = 'default',
  bordered = false,
  aspectRatio = 1,
  buyButton,
  ...otherProps
}: Props) {
  const {
    isVariantOf: { name },
    image: [img],
    offers: {
      lowPrice: spotPrice,
      offers: [{ listPrice, availability }],
    },
  } = product

  const linkProps = useProductLink({ product, selectedOffer: 0, index })
  const outOfStock = availability !== 'https://schema.org/InStock'

  return (
    <UICard
      data-fs-product-card
      data-fs-product-card-variant={variant}
      data-fs-product-card-bordered={bordered}
      {...otherProps}
    >
      <UICardImage>
        <Image
          baseUrl={img.url}
          alt={img.alternateName}
          aspectRatio={aspectRatio}
          {...imgOptions}
        />
      </UICardImage>

      <UICardContent data-fs-product-card-content>
        <div data-fs-product-card-heading>
          <h3 data-fs-product-card-title>
            <Link {...linkProps} title={name}>
              {name}
            </Link>
          </h3>
          <div data-fs-product-card-prices>
            <Price
              value={listPrice}
              formatter={useFormattedPrice}
              testId="list-price"
              data-value={listPrice}
              variant="listing"
              classes="text__legend"
              SRText="Original price:"
            />
            <Price
              value={spotPrice}
              formatter={useFormattedPrice}
              testId="price"
              data-value={spotPrice}
              variant="spot"
              classes="text__body"
              SRText="Sale Price:"
            />
          </div>
        </div>

        {outOfStock ? (
          <Badge small variant="neutral">
            Out of stock
          </Badge>
        ) : (
          <DiscountBadge small listPrice={listPrice} spotPrice={spotPrice} />
        )}
      </UICardContent>
      {!!buyButton && <UICardActions>{buyButton}</UICardActions>}
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
        availability
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

export default memo(ProductCard)
