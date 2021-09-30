import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useImage } from 'src/sdk/image/useImage'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProductLink } from 'src/sdk/product/useProductLink'
import type { ProductSummary_ProductFragment } from '@generated/ProductSummary_product.graphql'
import DiscountBadge from 'src/components/ui/DiscountBadge'
import Button from 'src/components/ui/Button'

interface Props {
  product: ProductSummary_ProductFragment
}

function ProductSummary({ product }: Props) {
  const {
    id,
    slug,
    name: productName,
    isVariantOf: { name },
    image: [img],
    offers: { lowPrice: spotPrice, offers },
  } = product

  const {
    listPrice,
    seller: { identifier },
  } = useMemo(
    () => offers.find((x) => x.price === spotPrice)!,
    [spotPrice, offers]
  )

  const linkProps = useProductLink({ slug })
  const image = useImage(img.url, 'product.summary')
  const buyProps = useBuyButton({
    name: productName,
    skuId: id,
    price: spotPrice,
    listPrice,
    quantity: 1,
    giftQuantity: 0,
    seller: identifier,
    image: {
      src: img.url,
      alt: img.alternateName,
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

    name

    isVariantOf {
      name
    }

    image {
      url
      alternateName
    }

    offers {
      lowPrice
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

export default ProductSummary
