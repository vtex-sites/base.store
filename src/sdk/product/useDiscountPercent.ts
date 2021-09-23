import { useMemo } from 'react'

export const useDiscountPercent = (listPrice: number, spotPrice: number) => {
  return useMemo(() => {
    const diff = listPrice - spotPrice
    const discount = (diff * 100) / listPrice

    return discount.toFixed(2)
  }, [spotPrice, listPrice])
}
