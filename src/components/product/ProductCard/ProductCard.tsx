import {
  Card as UICard,
  CardActions as UICardActions,
  CardContent as UICardContent,
  CardImage as UICardImage,
} from '@faststore/ui'
import { graphql, Link } from 'gatsby'
import React, { memo, useMemo } from 'react'
import AspectRatio from 'src/components/ui/AspectRatio'
import { Badge, DiscountBadge } from 'src/components/ui/Badge'
import { Image } from 'src/components/ui/Image'
import Price from 'src/components/ui/Price'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProductLink } from 'src/sdk/product/useProductLink'
import type { ReactNode } from 'react'
import type { AspectRatioProps } from 'src/components/ui/AspectRatio'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import './product-card.scss'

type Variant = 'horizontal' | 'vertical'

interface Props {
  product: ProductSummary_ProductFragment
  index: number
  bordered?: boolean
  outOfStock?: boolean
  variant?: Variant
  ratio?: AspectRatioProps['ratio']
  buyButton?: ReactNode
}

const imgOptions = {
  sourceWidth: 480,
  aspectRatio: 1,
  width: 360,
  backgroundColor: '#f0f0f0',
  layout: 'constrained' as const,
  loading: 'lazy' as const,
  sizes: '(max-width: 768px) 200px, 320px',
  breakpoints: [250, 360, 480],
  options: {
    fitIn: true,
  },
}

function ProductCard({
  product,
  index,
  variant = 'vertical',
  ratio = '1',
  bordered = false,
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
      className="product-card"
      data-card-variant={variant}
      data-card-bordered={bordered}
      data-card-out-of-stock={outOfStock}
      {...otherProps}
    >
      <UICardImage>
        <AspectRatio ratio={ratio}>
          <Image baseUrl={img.url} alt={img.alternateName} {...imgOptions} />
        </AspectRatio>
      </UICardImage>
      <UICardContent>
        <div className="product-card__heading">
          <h3 className="product-card__title / title-small">
            <Link {...linkProps} title={name}>
              {name}
            </Link>
          </h3>
          <div className="product-card__prices">
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
          <Badge small variant="outOfStock">
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
