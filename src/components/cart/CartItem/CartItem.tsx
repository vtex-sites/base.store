import React from 'react'
import { XCircle as XCircleIcon } from 'phosphor-react'
import Button from 'src/components/ui/Button'
import { Image } from 'src/components/ui/Image'
import Price from 'src/components/ui/Price'
import QuantitySelector from 'src/components/ui/QuantitySelector'
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
          width={72}
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

      <div data-cart-item-actions>
        <Button
          variant="tertiary"
          icon={<XCircleIcon size={18} />}
          iconPosition="left"
          {...btnProps}
        >
          Remove Item
        </Button>
        <QuantitySelector
          min={1}
          initial={item.quantity}
          max={10}
          disabled={false}
        />
      </div>
    </div>
  )
}

export default CartItem
