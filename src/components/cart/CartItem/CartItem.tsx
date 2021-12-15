import React from 'react'
import Button from 'src/components/ui/Button'
import Image from 'next/image'
import { useRemoveButton } from 'src/sdk/cart/useRemoveButton'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import type { AnalyticsCartItem } from 'src/sdk/analytics/types'

interface Props {
  item: AnalyticsCartItem
}

function CartItem({ item }: Props) {
  const btnProps = useRemoveButton(item)
  const price = useFormattedPrice(item.price)
  const listPrice = useFormattedPrice(item.listPrice)

  return (
    <div
      data-testid="cart-item"
      data-sku={item.itemOffered.sku}
      data-seller={item.seller.identifier}
    >
      <Image
        width={200}
        height={200}
        src={item.itemOffered.image[0].url}
        alt={item.itemOffered.image[0].alternateName}
      />
      <div>name: {item.itemOffered.name}</div>
      <div>sku: {item.itemOffered.sku}</div>
      <div>id: {item.id}</div>
      <div>seller: {item.seller.identifier}</div>
      <div>price: {price}</div>
      <div>listPrice: {listPrice}</div>
      <div>quantity: {item.quantity}</div>
      <Button {...btnProps}>Remove Item</Button>
    </div>
  )
}

export default CartItem
