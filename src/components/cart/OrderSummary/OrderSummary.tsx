import type { InputHTMLAttributes, ReactNode } from 'react'
import React from 'react'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'

import './order-summary.scss'

interface OrderSummaryProps extends InputHTMLAttributes<HTMLDivElement> {
  subTotal: number
  total: number
  numberOfItems: number
  checkoutButton: ReactNode
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
    <ul className="order-summary" data-order-summary>
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
    </ul>
  )
}

export default OrderSummary
