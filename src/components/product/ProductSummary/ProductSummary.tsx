import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useImage } from 'src/sdk/image/useImage'
import { useProductLink } from 'src/sdk/product/useProductLink'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import type { ProductSummary_ProductFragment } from '@generated/ProductSummary_product.graphql'

interface Props {
  product: ProductSummary_ProductFragment
}

const styles = {
  image: { width: '100%' },
  listPrice: { textDecoration: 'line-through' },
  offer: { display: 'flex', justifyContent: 'space-between' },
}

function ProductSummary({ product }: Props) {
  const { images, sellers, itemId } = product.items?.[0] ?? {}
  const { imageUrl: src, imageText: alt } = images?.[0] ?? {}
  const imageSrc = src ?? ''
  const imageAlt = alt ?? ''
  const [seller] = sellers!
  const offer = seller!.commercialOffer
  const linkProps = useProductLink({ slug: product.slug!, skuId: itemId! })
  const image = useImage(imageSrc, 'product.summary')
  const price = useFormattedPrice(offer!.spotPrice!)
  const listPrice = useFormattedPrice(offer!.listPrice!)
  const buyProps = useBuyButton(
    offer && {
      name: product.productName!,
      skuId: itemId!,
      price: offer.spotPrice!,
      listPrice: offer.listPrice!,
      quantity: 1,
      giftQuantity: 0,
      seller: seller!.sellerId!,
      image: {
        src: imageSrc,
        alt: imageAlt,
      },
    }
  )

  return (
    <Link {...linkProps}>
      <GatsbyImage
        style={styles.image}
        image={image}
        alt={imageAlt}
        sizes="(max-width: 768px) 200px, 320px"
      />
      <div>{product.productName}</div>
      <div style={styles.offer}>
        <span
          data-testid="list-price"
          data-value={offer!.listPrice!}
          style={styles.listPrice}
        >
          {listPrice}
        </span>
        <span data-testid="price" data-value={offer!.spotPrice!}>
          {price}
        </span>
      </div>
      <button {...buyProps}>Add to cart</button>
    </Link>
  )
}

export const fragment = graphql`
  fragment ProductSummary_product on VTEX_Product {
    slug: linkText
    id: productId
    productName

    items {
      itemId
      images {
        imageUrl
        imageText
      }
      sellers {
        sellerId
        commercialOffer: commertialOffer {
          spotPrice
          listPrice: ListPrice
        }
      }
    }
  }
`

export default ProductSummary
