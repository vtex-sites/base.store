import React from 'react'
import { useDiscountPercent } from 'src/sdk/product/useDiscountPercent'

import Badge from './Badge'

import './badge.scss'

type Props = {
  listPrice: number
  spotPrice: number
  small?: boolean
}

const DiscountBadge = ({ listPrice, spotPrice, small = false }: Props) => {
  const discountPercent = Math.round(
    Number(useDiscountPercent(listPrice, spotPrice))
  )

  if (!discountPercent) {
    return <></>
  }

  return (
    <Badge small={small} variant="discount">
      {discountPercent}% off
    </Badge>
  )
}

export default DiscountBadge
