import React from 'react'
import { Checkbox as UICheckbox } from '@vtex/store-ui'
import type { CheckboxProps } from '@vtex/store-ui'

function Checkbox(props: CheckboxProps) {
  return <UICheckbox {...props} />
}

export default Checkbox
