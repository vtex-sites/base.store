import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { useRemoveButton } from 'src/sdk/cart/useRemoveButton'
import { useImage } from 'src/sdk/image/useImage'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import type { CartItem as ICartItem } from 'src/sdk/cart/useCart'
import Button from 'src/components/ui/Button'

interface Props {
  item: ICartItem
}

function CartItem({ item }: Props) {
  const btnProps = useRemoveButton(item)
  const price = useFormattedPrice(item.price)
  const listPrice = useFormattedPrice(item.listPrice)
  const image = useImage(item.image.src, 'product.miniature')

  return (
    <div
      data-testid="cart-item"
      data-sku={item.skuId}
      data-seller={item.seller}
    >
      <GatsbyImage image={image} alt={item.image.alt} />
      <div>name: {item.name}</div>
      <div>id: {item.id}</div>
      <div>skuId: {item.skuId}</div>
      <div>seller: {item.seller}</div>
      <div>price: {price}</div>
      <div>listPrice: {listPrice}</div>
      <div>quantity: {item.quantity}</div>
      <div>gifts: {item.giftQuantity}</div>
      <Button {...btnProps}>Remove Item</Button>
    </div>
  )
}

export default CartItem
