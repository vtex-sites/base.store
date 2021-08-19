import React, { useCallback } from 'react'
import { useCart, useGlobalUIState } from '@vtex/store-sdk'
import { graphql } from 'gatsby'
import type { CartItem } from '@vtex/store-sdk'
import type { ProductDetailsFragment_ProductFragment } from 'src/views/product/__generated__/ProductViewFragment_product.graphql'

interface Props {
  product: ProductDetailsFragment_ProductFragment
}

const useBuyButton = (item: CartItem | null | undefined) => {
  const { addItem } = useCart()
  const { openMinicart } = useGlobalUIState()

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()

      if (!item) {
        return
      }

      addItem(item)
      openMinicart()
    },
    [item, addItem, openMinicart]
  )

  return { onClick }
}

function ProductDetails({ product }: Props) {
  const offer = product.items?.[0]?.sellers?.[0]?.commercialOffer
  const btnProps = useBuyButton(
    offer && {
      id: product.id!,
      price: offer.spotPrice!,
      listPrice: offer.listPrice!,
      quantity: {
        selling: 1,
        gift: 0,
      },
    }
  )

  return (
    <>
      <h1>{product.productName}</h1>
      <button {...btnProps}>Buy Now</button>
    </>
  )
}

export const fragment = graphql`
  fragment ProductDetailsFragment_product on StoreProduct {
    id: productId
    productName

    items {
      sellers {
        commercialOffer: commertialOffer {
          spotPrice
          listPrice: ListPrice
        }
      }
    }
  }
`

export default ProductDetails
