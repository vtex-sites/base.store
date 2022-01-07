import { graphql, Link } from 'gatsby'
import React, { useMemo } from 'react'
import Button from 'src/components/ui/Button'
import DiscountBadge from 'src/components/ui/DiscountBadge'
import Price from 'src/components/ui/Price'
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

import './product-card.scss'

type Variant = 'horizontal' | 'vertical'

interface Props {
  product: ProductSummary_ProductFragment
  index: number
  variant?: Variant
  showActions?: boolean
}

function ProductCard({
  product,
  index,
  variant = 'vertical',
  showActions = true,
}: Props) {
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
    <UICard className="product-card" data-card-variant={variant}>
      <UICardImage>
        <Image
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
      </UICardImage>
      <UICardContent>
        <div className="product-card__heading">
          <h3 className="product-card__title">
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
        <DiscountBadge small listPrice={listPrice} spotPrice={spotPrice} />
      </UICardContent>
      {showActions && (
        <UICardActions>
          <Button
            {...buyProps}
            variant="primary"
            icon={<ShoppingCartIcon size={18} weight="bold" />}
            iconPosition="left"
            aria-label="Add to cart"
            title="Add to cart"
          >
            Add
          </Button>
        </UICardActions>
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
