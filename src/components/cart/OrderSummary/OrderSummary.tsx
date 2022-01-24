import type { ReactNode } from 'react'
import React from 'react'
import { List } from '@faststore/ui'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'

import './order-summary.scss'

interface OrderSummaryProps {
  subTotal: number
  total: number
  numberOfItems: number
  checkoutButton?: ReactNode
}

function OrderSummary({
  subTotal,
  total,
  numberOfItems,
  checkoutButton,
}: OrderSummaryProps) {
  const discount = subTotal - total
  const formattedDiscount = useFormattedPrice(discount)

  return (
    <List className="order-summary" data-order-summary>
      <li>
        <span>Subtotal ({numberOfItems} products)</span>
        <span>{useFormattedPrice(subTotal)}</span>
      </li>
      {discount > 0 && (
        <li data-order-summary-discount>
          <span>Discount</span>
          <span>-{formattedDiscount}</span>
        </li>
      )}
      <li className="title-subsection">
        <span>Total</span>
        <span>{useFormattedPrice(total)}</span>
      </li>
      {checkoutButton}
    </List>
  )
}

export default OrderSummary
