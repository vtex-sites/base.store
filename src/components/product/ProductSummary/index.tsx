/** @jsx jsx */
import { useLink } from '@vtex/gatsby-theme-store'
import { LocalizedLink, jsx } from '@vtex/store-ui'
import { useThumborImageData } from '@vtex/gatsby-plugin-thumbor'
import imageConf from 'src/images/config'
import type { FC } from 'react'
import { graphql } from 'gatsby'
import BuyButton from 'src/components/ui/BuyButton'

import Offer from './Offer'
import OfferPreview from './OfferPreview'
import styles from './styles.json'
import type { ProductSummary_ProductFragment } from './__generated__/ProductSummary_product.graphql'

interface Props {
  product: ProductSummary_ProductFragment
  position?: number
}

const ProductSummary: FC<Props> = ({ product, position }) => {
  const {
    items: [sku],
    productName,
  } = product

  const {
    images: [{ imageUrl, imageText }],
    sellers,
  } = sku

  const linkProps = useLink(product, { pixelData: { position } })
  const image = useThumborImageData({
    ...imageConf['product.summary'],
    baseUrl: imageUrl,
  })

  const itemSku = {
    ...sku,
    images: [{ imageUrl: image.images.fallback?.src }],
  }

  return (
    <LocalizedLink
      data-testid="productSummaryContainer"
      state={{ fromSummary: true }}
      sx={styles.link}
      {...linkProps}
    >
      <div sx={styles.imageContainer}>
        <img
          sx={styles.image}
          alt={imageText ?? 'Product Image'}
          loading="lazy"
          width={image.width}
          height={image.height}
          {...image.images.fallback}
        />
      </div>
      <h3 sx={styles.title} data-testid="productSummaryTitle">
        {productName}
      </h3>

      {sellers === undefined ? (
        <OfferPreview />
      ) : sellers.length > 0 ? (
        <Offer
          variant="productSummary"
          commercialOffer={sellers[0].commercialOffer}
        />
      ) : null}

      <BuyButton sku={itemSku} product={product} />
    </LocalizedLink>
  )
}

export const fragment = graphql`
  fragment ProductSummary_product on VTEX_Product {
    id: productId
    productName
    linkText
    brand
    productReference
    categoryTree {
      name
    }
    productClusters {
      id
      name
    }
    properties {
      name
      originalName
      values
    }
    items {
      itemId
      name
      referenceId {
        value: Value
      }
      images {
        imageUrl
        imageText
      }
      sellers {
        sellerId
        commercialOffer: commertialOffer {
          maxInstallments: Installments(criteria: MAX_WITHOUT_INTEREST) {
            value: Value
            numberOfInstallments: NumberOfInstallments
          }
          installments: Installments(criteria: ALL) {
            value: Value
            numberOfInstallments: NumberOfInstallments
            interestRate: InterestRate
          }
          availableQuantity: AvailableQuantity
          price: Price
          listPrice: ListPrice
          spotPrice
          teasers {
            name
          }
        }
      }
    }
  }
`

export default ProductSummary
