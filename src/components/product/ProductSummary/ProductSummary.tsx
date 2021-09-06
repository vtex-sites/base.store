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
  const {
    sku,
    slug,
    name,
    image: [img],
  } = product

  const linkProps = useProductLink({ slug, skuId: sku })
  const image = useImage(img.url, 'product.summary')

  return (
    <Link {...linkProps}>
      <GatsbyImage
        style={styles.image}
        image={image}
        alt={img.alternateName}
        sizes="(max-width: 768px) 200px, 320px"
      />
      <div>{name}</div>
    </Link>
  )

  // const { images, sellers, itemId } = product.items?.[0] ?? {}
  // const { imageUrl: src, imageText: alt } = images?.[0] ?? {}
  // const imageSrc = src ?? ''
  // const imageAlt = alt ?? ''
  // const [seller] = sellers!
  // const offer = seller!.commercialOffer
  // const price = useFormattedPrice(offer!.spotPrice!)
  // const listPrice = useFormattedPrice(offer!.listPrice!)
  // const buyProps = useBuyButton(
  //   offer && {
  //     name: product.name,
  //     skuId: itemId!,
  //     price: offer.spotPrice!,
  //     listPrice: offer.listPrice!,
  //     quantity: 1,
  //     giftQuantity: 0,
  //     seller: seller!.sellerId!,
  //     image: {
  //       src: imageSrc,
  //       alt: imageAlt,
  //     },
  //   }
  // )

  // return (
  //   <Link {...linkProps}>
  //     <GatsbyImage
  //       style={styles.image}
  //       image={image}
  //       alt={imageAlt}
  //       sizes="(max-width: 768px) 200px, 320px"
  //     />
  //     <div>{product.name}</div>
  //     <div style={styles.offer}>
  //       <span style={styles.listPrice}>{listPrice}</span>
  //       <span>{price}</span>
  //     </div>
  //     <button {...buyProps}>Add to cart</button>
  //   </Link>
  // )
}

export const fragment = graphql`
  fragment ProductSummary_product on StoreProduct {
    id: productID
    slug
    name

    sku

    image {
      url
      alternateName
    }

    # items {
    #   itemId
    #   images {
    #     imageUrl
    #     imageText
    #   }
    #   sellers {
    #     sellerId
    #     commercialOffer: commertialOffer {
    #       spotPrice
    #       listPrice: ListPrice
    #     }
    #   }
    # }
  }
`

export default ProductSummary
