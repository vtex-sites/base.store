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
    <div className="order-summary" data-order-summary>
      <p data-order-summary-subtotal>
        <div>Subtotal ({numberOfItems} products)</div>
        <div>{useFormattedPrice(subTotal)}</div>
      </p>
      {discount > 0 && (
        <p data-order-summary-discount>
          <div>Discount</div>
          <div>-{formattedDiscount}</div>
        </p>
      )}
      <p className="title-subsection" data-order-summary-total>
        <div>Total</div>
        <div>{useFormattedPrice(total)}</div>
      </p>
      {checkoutButton}
    </div>
  )
}

export default OrderSummary
