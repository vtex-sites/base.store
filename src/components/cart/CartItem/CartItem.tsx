import React from 'react'
import Button from 'src/components/ui/Button'
import { Image } from 'src/components/ui/Image'
import type { CartItemWithAnalytics } from 'src/sdk/cart/useBuyButton'
import { useRemoveButton } from 'src/sdk/cart/useRemoveButton'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'

interface Props {
  item: CartItemWithAnalytics
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
        baseUrl={item.itemOffered.image[0].url}
        alt={item.itemOffered.image[0].alternateName}
        sourceWidth={720}
        aspectRatio={1}
        width={100}
        breakpoints={[50, 100, 150]}
        layout="constrained"
        backgroundColor="#f0f0f0"
        options={{
          fitIn: true,
        }}
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
