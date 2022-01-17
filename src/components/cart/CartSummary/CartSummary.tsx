import type { InputHTMLAttributes, ReactNode } from 'react'
import React from 'react'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'

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
    <div>
      <div>
        Subtotal ({numberOfItems}) products: {useFormattedPrice(subTotal)}
      </div>
      <div>Discount: {useFormattedPrice(subTotal - total)}</div>
      <div>Total: {useFormattedPrice(total)}</div>
      {checkoutButton}
    </div>
  )
}

export default CartSummary
