import { Badge } from '@vtex/store-ui'
import React from 'react'
import { useDiscountPercent } from 'src/sdk/product/useDiscountPercent'

type Props = {
  listPrice: number
  spotPrice: number
}

const DiscountBadge = ({ listPrice, spotPrice }: Props) => {
  const discountPercent = useDiscountPercent(listPrice, spotPrice)

  if (!Number(discountPercent)) {
    return <></>
  }

  return <Badge>{discountPercent}%</Badge>
}

export default DiscountBadge
