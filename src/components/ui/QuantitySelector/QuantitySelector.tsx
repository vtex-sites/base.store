import React, { memo, useEffect, useState } from 'react'
import { QuantitySelector as UIQuantitySelector } from '@faststore/ui'
import { Plus as PlusIcon, Minus as MinusIcon } from 'phosphor-react'

import './quantity-selector.scss'

interface QuantitySelectorProps {
  max?: number
  min?: number
  initial?: number
  disabled?: boolean
  onChange?: (value: number) => void
}

export function QuantitySelector({
  max,
  min = 1,
  initial,
  disabled = false,
  onChange,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState<number>(initial ?? min)
  const isLeftDisabled = quantity === min
  const isRightDisabled = quantity === max

  const changeQuantity = (increaseValue: number) => {
    const quantityValue = validateQuantityBounds(quantity + increaseValue)

    onChange?.(quantityValue)
    setQuantity(quantityValue)
  }

  const increase = () => changeQuantity(1)

  const decrease = () => changeQuantity(-1)

  function validateQuantityBounds(n: number): number {
    const maxValue = min ? Math.max(n, min) : n

    return max ? Math.min(maxValue, max) : maxValue
  }

  function validateInput(e: React.FormEvent<HTMLInputElement>) {
    const val = e.currentTarget.value

    if (!Number.isNaN(Number(val))) {
      setQuantity(() => {
        const quantityValue = validateQuantityBounds(Number(val))

        onChange?.(quantityValue)

        return quantityValue
      })
    }
  }

  useEffect(() => {
    initial && setQuantity(initial)
  }, [initial])

  return (
    <UIQuantitySelector
      data-store-quantity-selector={disabled ? 'disabled' : 'true'}
      quantity={quantity}
      leftButtonProps={{
        onClick: decrease,
        disabled: isLeftDisabled || disabled,
        icon: <MinusIcon size={16} weight="bold" />,
      }}
      rightButtonProps={{
        onClick: increase,
        disabled: isRightDisabled || disabled,
        icon: <PlusIcon size={16} weight="bold" />,
      }}
      inputProps={{
        onChange: validateInput,
        readOnly: false,
        disabled,
      }}
    />
  )
}

export default memo(QuantitySelector)
