import React, { useState } from 'react'
import { QuantitySelector as UIQuantitySelector } from '@faststore/ui'
import { Plus as PlusIcon, Minus as MinusIcon } from 'phosphor-react'

import './quantity-selector.scss'

interface QuantitySelectorProps {
  max: number
  min: number
  disabled: boolean
}

export function QuantitySelector({
  max,
  min,
  disabled,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState<number>(min)
  const isLeftDisabled = quantity === min
  const isRightDisabled = quantity === max

  function increase() {
    setQuantity((currentQuantity) =>
      validateQuantityBounds(currentQuantity + 1)
    )
  }

  function decrease() {
    setQuantity((currentQuantity) =>
      validateQuantityBounds(currentQuantity - 1)
    )
  }

  function validateQuantityBounds(n: number): number {
    return Math.min(Math.max(n, min), max)
  }

  function validateInput(e: React.FormEvent<HTMLInputElement>) {
    const val = e.currentTarget.value

    if (!Number.isNaN(Number(val))) {
      setQuantity(validateQuantityBounds(Number(val)))
    }
  }

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

export default QuantitySelector
