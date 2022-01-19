import React from 'react'
import Button from 'src/components/ui/Button'
import { Image } from 'src/components/ui/Image'
import Price from 'src/components/ui/Price'
import type { CartItemWithAnalytics } from 'src/sdk/cart/useBuyButton'
import { useRemoveButton } from 'src/sdk/cart/useRemoveButton'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'

import './cart-item.scss'

interface Props {
  item: CartItemWithAnalytics
}

function CartItem({ item }: Props) {
  const btnProps = useRemoveButton(item)

  return (
    <div
      className="cart-item"
      data-cart-item
      data-testid="cart-item"
      data-sku={item.itemOffered.sku}
      data-seller={item.seller.identifier}
    >
      <div data-cart-item-content>
        <Image
          baseUrl={item.itemOffered.image[0].url}
          alt={item.itemOffered.image[0].alternateName}
          sourceWidth={360}
          aspectRatio={1}
          width={60}
          breakpoints={[50, 100, 150]}
          layout="constrained"
          backgroundColor="#f0f0f0"
          options={{
            fitIn: true,
          }}
        />
        <div data-cart-item-summary>
          <div className="text-body">{item.isVariantOf?.name}</div>
          <div data-cart-item-price>
            <Price
              value={item.listPrice}
              formatter={useFormattedPrice}
              testId="list-price"
              data-value={item.listPrice}
              variant="listing"
              classes="text-body-small"
              SRText="Original price:"
            />
            <Price
              value={item.price}
              formatter={useFormattedPrice}
              testId="price"
              data-value={item.price}
              variant="spot"
              classes="title-subsection"
              SRText="Price:"
            />
          </div>
        </div>
      </div>

      <div>sku: {item.itemOffered.sku}</div>
      <div>id: {item.id}</div>
      <div>seller: {item.seller.identifier}</div>

      <div>quantity: {item.quantity}</div>
      <Button {...btnProps}>Remove Item</Button>
    </div>
  )
}

export default CartItem
