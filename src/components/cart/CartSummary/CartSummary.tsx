import type { InputHTMLAttributes, ReactNode } from 'react'
import React from 'react'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'

import './cart-summary.scss'

export interface CartSummaryProps extends InputHTMLAttributes<HTMLDivElement> {
  subTotal: number
  total: number
  numberOfItems: number
  checkoutButton: ReactNode
}

function CartSummary({
  subTotal,
  total,
  numberOfItems,
  checkoutButton,
}: CartSummaryProps) {
  return (
    <div className="cart-summary" data-cart-summary>
      <p data-cart-summary-subtotal>
        <div>Subtotal ({numberOfItems} products)</div>
        <div>{useFormattedPrice(subTotal)}</div>
      </p>
      <p data-cart-summary-discount>
        <div>Discount</div>
        <div>-{useFormattedPrice(subTotal - total)}</div>
      </p>
      <p className="title-subsection" data-cart-summary-total>
        <div>Total</div>
        <div>{useFormattedPrice(total)}</div>
      </p>
      {checkoutButton}
    </div>
  )
}

export default CartSummary
