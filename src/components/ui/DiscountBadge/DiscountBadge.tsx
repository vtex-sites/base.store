import { Badge as UIBadge } from '@faststore/ui'
import React from 'react'
import { useDiscountPercent } from 'src/sdk/product/useDiscountPercent'

import './discount-badge.scss'

type Props = {
  listPrice: number
  spotPrice: number
  small?: boolean
}

const DiscountBadge = ({ listPrice, spotPrice, small = false }: Props) => {
  const discountPercent = useDiscountPercent(listPrice, spotPrice)

  if (!Number(discountPercent)) {
    return <></>
  }

  return (
    <UIBadge className="discount-badge" data-store-badge={small ? 'small' : ''}>
      {discountPercent}% off
    </UIBadge>
  )
}

export default DiscountBadge
