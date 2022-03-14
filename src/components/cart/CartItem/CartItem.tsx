import { Card, CardActions, CardContent, CardImage } from '@faststore/ui'
import React from 'react'
import Button from 'src/components/ui/Button'
import { Image } from 'src/components/ui/Image'
import Price from 'src/components/ui/Price'
import QuantitySelector from 'src/components/ui/QuantitySelector'
import { useCart } from 'src/sdk/cart/useCart'
import { useRemoveButton } from 'src/sdk/cart/useRemoveButton'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import type { CartItem as ICartItem } from 'src/sdk/cart/validate'
import Icon from 'src/components/ui/Icon'

import './cart-item.scss'

interface Props {
  item: ICartItem
}

const imgOptions = {
  sourceWidth: 360,
  aspectRatio: 1,
  width: 72,
  breakpoints: [50, 100, 150],
  layout: 'constrained' as const,
  backgroundColor: '#f0f0f0',
}

function CartItem({ item }: Props) {
  const btnProps = useRemoveButton(item)
  const { updateItemQuantity } = useCart()

  return (
    <Card
      className="cart-item"
      data-testid="cart-item"
      data-sku={item.itemOffered.sku}
      data-seller={item.seller.identifier}
    >
      <CardContent>
        <CardImage>
          <Image
            baseUrl={item.itemOffered.image[0].url}
            alt={item.itemOffered.image[0].alternateName}
            {...imgOptions}
          />
        </CardImage>
        <div data-cart-item-summary>
          <p className="text-body">{item.itemOffered.isVariantOf.name}</p>
          <span data-cart-item-prices>
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
          </span>
        </div>
      </CardContent>

      <CardActions>
        <Button
          variant="tertiary"
          icon={<Icon name="XCircle" width={18} height={18} />}
          iconPosition="left"
          {...btnProps}
        >
          Remove
        </Button>
        <QuantitySelector
          min={1}
          initial={item.quantity}
          onChange={(quantity) => updateItemQuantity(item.id, quantity)}
        />
      </CardActions>
    </Card>
  )
}

export default CartItem
