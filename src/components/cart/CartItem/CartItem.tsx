import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { useImage } from 'src/sdk/image/useImage'

interface Props {
  item: ICartItem
}

const useRemoveButton = (item: ICartItem | null | undefined) => {
  const { removeItem } = useCart()

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()

      if (!item) {
        return
      }

      removeItem(item.id)
    },
    [item, removeItem]
  )

  return { onClick }
}

function CartItem({ item }: Props) {
  const btnProps = useRemoveButton(item)
  const image = useImage(item.image.src, 'product.miniature')

  return (
    <div>
      <GatsbyImage image={image} alt={item.image.alt} />
      <div>id: {item.id}</div>
      <div>price: {item.price}</div>
      <div>listPrice: {item.listPrice}</div>
      <div>quantity: {item.quantity.selling}</div>
      <div>gifts: {item.quantity.gift}</div>
      <button {...btnProps}>Remove Item</button>
    </div>
  )
}

export default CartItem
