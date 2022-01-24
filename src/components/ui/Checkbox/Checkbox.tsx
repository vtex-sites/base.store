import React from 'react'
import { Checkbox as UICheckbox } from '@faststore/ui'
import type { CheckboxProps as UICheckboxProps } from '@faststore/ui'

import './checkbox.scss'

type CheckboxProps = {
  partial?: boolean
} & UICheckboxProps

function Checkbox({ partial, ...otherProps }: CheckboxProps) {
  return <UICheckbox data-store-checkbox-partial={partial} {...otherProps} />
}

export default Checkbox
