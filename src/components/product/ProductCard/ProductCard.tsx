import { graphql, Link } from 'gatsby'
import React, { useMemo } from 'react'
import Button from 'src/components/ui/Button'
import Select from 'src/components/ui/Select'
import Badge from 'src/components/ui/Badge'
import Price from 'src/components/ui/Price'
import AspectRatio from 'src/components/ui/AspectRatio'
import type { AspectRatioProps } from 'src/components/ui/AspectRatio'
import { Image } from 'src/components/ui/Image'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProductLink } from 'src/sdk/product/useProductLink'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import { ShoppingCart as ShoppingCartIcon } from 'phosphor-react'
import QuantitySelector from 'src/components/ui/QuantitySelector'
import {
  Card as UICard,
  CardImage as UICardImage,
  CardContent as UICardContent,
  CardActions as UICardActions,
} from '@faststore/ui'

import './product-card.scss'

type Structure = 'wide' | 'default' | 'horizontal' | 'grocery'

type BadgeVariant = 'success' | 'highlighted' | 'info' | 'neutral' | 'promo'

type Action = 'quantitySelector' | 'button' | ''

interface Props {
  product: ProductSummary_ProductFragment
  index: number
  structure?: Structure
  badgeVariant?: BadgeVariant
  action?: Action
  select?: boolean
  moreInfo?: boolean
  showDescription?: boolean
  ratio?: AspectRatioProps['ratio']
  classes?: string
}

function ProductCard({
  product,
  index,
  structure = 'default',
  badgeVariant = 'neutral',
  action = '',
  ratio = '1',
  select = false,
  moreInfo = false,
  showDescription = false,
  classes = '',
}: Props) {
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
    <UICard
      className={classes}
      data-card-structure={structure}
      data-base-product-card
    >
      <UICardImage>
        <AspectRatio ratio={ratio}>
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
        </AspectRatio>
      </UICardImage>

      <UICardContent>
        <div data-base-product-card-heading>
          <h3 data-base-product-card-title>
            <Link {...linkProps} title={name}>
              {name}
            </Link>
          </h3>
          <div data-base-product-card-prices>
            <Price
              value={listPrice}
              formatter={useFormattedPrice}
              testId="list-price"
              data-value={listPrice}
              variant="listing"
              SRText="Original price:"
            />
            <Price
              value={spotPrice}
              formatter={useFormattedPrice}
              testId="price"
              data-value={spotPrice}
              variant="spot"
              SRText="Sale Price:"
            />
          </div>
        </div>
        {showDescription && (
          <p data-base-product-card-description>
            The quick brown fox jumps over the lazy dog
          </p>
        )}
        <Badge variant={badgeVariant} small>
          20% off
        </Badge>
        {(select || moreInfo) && (
          <footer data-base-product-card-footer>
            {select && <Select />}
            {moreInfo && (
              <div>
                <small>~$2,13 /un.</small>
                <small>~300g /un.</small>
              </div>
            )}
          </footer>
        )}
      </UICardContent>

      {action === 'button' && (
        <UICardActions>
          <Button
            {...buyProps}
            variant="primary"
            icon={<ShoppingCartIcon size={18} weight="bold" />}
            iconPosition="left"
            aria-label="Add to cart"
            title="Add to cart"
            size="small"
          >
            Add
          </Button>
        </UICardActions>
      )}
      {action === 'quantitySelector' && (
        <UICardActions>
          <QuantitySelector min={1} max={10} disabled={false} />
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
