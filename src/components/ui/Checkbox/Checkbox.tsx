import { Checkbox as UICheckbox } from '@faststore/ui'
import React from 'react'
import type { CheckboxProps as UICheckboxProps } from '@faststore/ui'

type CheckboxProps = {
  partial?: boolean
} & UICheckboxProps

function Checkbox({ partial, ...otherProps }: CheckboxProps) {
  return <UICheckbox data-store-checkbox-partial={partial} {...otherProps} />
}

export default Checkbox
