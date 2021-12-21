import React from 'react'
import { Button as UIButton } from '@faststore/ui'
import type { ButtonProps } from '@faststore/ui'
import { ShoppingCart } from 'phosphor-react'

type Props = ButtonProps

function BuyButton({ children, ...props }: Props) {
  return (
    <UIButton {...props}>
      <ShoppingCart />
      {children}
    </UIButton>
  )
}

export default BuyButton
