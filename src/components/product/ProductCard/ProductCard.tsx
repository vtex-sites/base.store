import {
  Card as UICard,
  CardActions as UICardActions,
  CardContent as UICardContent,
  CardImage as UICardImage,
} from '@faststore/ui'
import { graphql, Link } from 'gatsby'
import React, { memo, useMemo } from 'react'
import { Badge, DiscountBadge } from 'src/components/ui/Badge'
import { Image } from 'src/components/ui/Image'
import Price from 'src/components/ui/Price'
import cn from 'classnames'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProductLink } from 'src/sdk/product/useProductLink'
import type { ReactNode } from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

import * as style from './product-card.module.scss'

type Variant = 'horizontal' | 'vertical'

interface Props {
  product: ProductSummary_ProductFragment
  index: number
  bordered?: boolean
  outOfStock?: boolean
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
  variant = 'vertical',
  bordered = false,
  aspectRatio = 1,
  outOfStock = false,
  buyButton,
  ...otherProps
}: Props) {
  const {
    isVariantOf: { name },
    image: [img],
    offers: { lowPrice: spotPrice, offers },
  } = product

  // TODO: Move this computation to the backend
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

  const { listPrice } = offers[selectedOffer]

  const linkProps = useProductLink({ product, selectedOffer, index })

  return (
    <UICard
      className={cn(style.container, {
        [style.vertical]: variant === 'vertical',
        [style.horizontal]: variant === 'horizontal',
        [style.bordered]: bordered,
        [style.outOfStock]: outOfStock,
      })}
      {...otherProps}
    >
      <UICardImage className={style.image}>
        <Image
          baseUrl={img.url}
          alt={img.alternateName}
          aspectRatio={aspectRatio}
          {...imgOptions}
        />
      </UICardImage>
      <UICardContent className={style.content}>
        <div className={style.heading}>
          <h3 className="title-small">
            <Link {...linkProps} title={name}>
              {name}
            </Link>
          </h3>
          <div className={style.prices}>
            <Price
              value={listPrice}
              formatter={useFormattedPrice}
              testId="list-price"
              data-value={listPrice}
              variant="listing"
              classes="text-body-small"
              SRText="Original price:"
            />
            <Price
              value={spotPrice}
              formatter={useFormattedPrice}
              testId="price"
              data-value={spotPrice}
              variant="spot"
              classes="text-body"
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
      {!!buyButton && (
        <UICardActions className={style.actions}>{buyButton}</UICardActions>
      )}
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
