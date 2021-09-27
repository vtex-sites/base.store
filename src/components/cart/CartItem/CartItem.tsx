import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { useRemoveButton } from 'src/sdk/cart/useRemoveButton'
import { useImage } from 'src/sdk/image/useImage'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import type { CartItem as ICartItem } from 'src/sdk/cart/validate'

interface Props {
  item: ICartItem
}

function CartItem({ item }: Props) {
  const btnProps = useRemoveButton(item)
  const price = useFormattedPrice(item.price)
  const listPrice = useFormattedPrice(item.listPrice)
  const image = useImage(item.itemOffered.image[0].url, 'product.miniature')

  return (
    <div
      data-testid="cart-item"
      data-sku={item.itemOffered.sku}
      data-seller={item.seller}
    >
      <GatsbyImage
        image={image}
        alt={item.itemOffered.image[0].alternateName}
      />
      <div>name: {item.itemOffered.name}</div>
      <div>sku: {item.itemOffered.sku}</div>
      <div>id: {item.id}</div>
      <div>seller: {item.seller.identifier}</div>
      <div>price: {price}</div>
      <div>listPrice: {listPrice}</div>
      <div>quantity: {item.quantity}</div>
      {/* TODO: <div>gifts: {item.giftQuantity}</div> */}
      <button {...btnProps}>Remove Item</button>
    </div>
  )
}

export default CartItem
