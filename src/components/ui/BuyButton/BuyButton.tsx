import React from 'react'
import { Button as UIButton } from '@faststore/ui'
import type { ButtonProps } from '@faststore/ui'
import { ShoppingCart as ShoppingCartIcon } from 'phosphor-react'

import './buy-button.scss'

type Props = ButtonProps

function BuyButton({ children, ...props }: Props) {
  return (
    <UIButton className="button" data-store-buy-button {...props}>
      <ShoppingCartIcon size="18" weight="bold" />
      {children}
    </UIButton>
  )
}

export default BuyButton
