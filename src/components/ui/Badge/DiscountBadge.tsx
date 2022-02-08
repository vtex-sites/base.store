import React, { memo } from 'react'
import { useDiscountPercent } from 'src/sdk/product/useDiscountPercent'

import Badge from './Badge'

import './badge.scss'

type Props = {
  listPrice: number
  spotPrice: number
  small?: boolean
  // Set limit percentage value to consider a low discount.
  thresholdLow?: number
  // Set limit percentage value to consider a high discount
  thresholdHigh?: number
}

const DiscountBadge = ({
  listPrice,
  spotPrice,
  small = false,
  thresholdLow = 15,
  thresholdHigh = 40,
}: Props) => {
  const discountPercent = Math.round(
    Number(useDiscountPercent(listPrice, spotPrice))
  )

  if (!discountPercent) {
    return <></>
  }

  const discountVariant =
    discountPercent <= thresholdLow
      ? 'low'
      : discountPercent <= thresholdHigh
      ? 'medium'
      : 'high'

  return (
    <Badge small={small} data-store-discount-badge-variant={discountVariant}>
      {discountPercent}% off
    </Badge>
  )
}

export default memo(DiscountBadge)
