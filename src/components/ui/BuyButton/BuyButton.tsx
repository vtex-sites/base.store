import React, { lazy } from 'react'
import { Button as UIButton } from '@faststore/ui'
import type { ButtonProps } from '@faststore/ui'
import LazyIcon from 'src/components/common/LazyIcon'

import 'src/styles/icons.scss'
import './buy-button.scss'

const ShoppingCartIcon = lazy(
  () => import('phosphor-react/src/icons/ShoppingCart')
)

type Props = ButtonProps

function BuyButton({ children, ...props }: Props) {
  return (
    <UIButton className="button" data-store-buy-button {...props}>
      <span className="icon__18">
        <LazyIcon icon={ShoppingCartIcon} size="18" weight="bold" />
      </span>
      {children}
    </UIButton>
  )
}

export default BuyButton
