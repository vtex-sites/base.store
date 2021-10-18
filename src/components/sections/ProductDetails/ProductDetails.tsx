import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import Button from 'src/components/ui/Button'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useImage } from 'src/sdk/image/useImage'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import type { ProductDetailsFragment_ProductFragment } from '@generated/ProductDetailsFragment_product.graphql'
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Price,
} from '@vtex/store-ui'

interface Props {
  product: ProductDetailsFragment_ProductFragment
}

const installmentOptions = [
  {
    numberOfInstallments: 1,
    monthlyPayment: 200,
    total: 200,
  },
  {
    numberOfInstallments: 2,
    monthlyPayment: 100,
    total: 200,
  },
  {
    numberOfInstallments: 3,
    monthlyPayment: 68,
    total: 204,
  },
  {
    numberOfInstallments: 4,
    monthlyPayment: 52,
    total: 208,
  },
  {
    numberOfInstallments: 5,
    monthlyPayment: 43,
    total: 215,
  },
]

function priceFormatter(price: number) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)

  return formattedPrice
}

const styles = {
  listPrice: { textDecoration: 'line-through' },
}

function ProductDetails({ product }: Props) {
  const {
    id,
    isVariantOf: { name },
    name: skuName,
    brand: { name: brandName },
    sku,
    image: [img],
    offers: {
      offers: [{ price, listPrice, seller }],
    },
  } = product

  const image = useImage(img.url, 'product.details')
  const buyProps = useBuyButton({
    id,
    name,
    brand: brandName,
    price,
    listPrice,
    seller,
    quantity: 1,
    itemOffered: {
      image: [img],
      name: skuName,
      sku,
    },
  })

  return (
    <div>
      <h2>{skuName}</h2>
      <GatsbyImage image={image} alt={img.alternateName} loading="eager" />
      <div style={styles.listPrice}>{useFormattedPrice(listPrice)}</div>
      <div>{useFormattedPrice(price)}</div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell scope="col" variant="header">
              Installments
            </TableCell>
            <TableCell scope="col" variant="header">
              Amount
            </TableCell>
            <TableCell scope="col" variant="header">
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {installmentOptions.map((option) => (
            <TableRow key={option.numberOfInstallments}>
              <TableCell>{option.numberOfInstallments}x</TableCell>
              <TableCell>
                <Price
                  formatter={priceFormatter}
                  value={option.monthlyPayment}
                />
              </TableCell>
              <TableCell>
                <Price formatter={priceFormatter} value={option.total} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button {...buyProps}>Add to cart</Button>
    </div>
  )
}

export const fragment = graphql`
  fragment ProductDetailsFragment_product on StoreProduct {
    id: productID
    name
    sku

    isVariantOf {
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

export default ProductDetails
