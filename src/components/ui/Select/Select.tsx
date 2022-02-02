import React from 'react'
import { Select as UISelect } from '@faststore/ui'
import type { SelectProps } from '@faststore/ui'
import { CaretDown as CaretDownIcon } from 'phosphor-react'

import './select.scss'

type SelectOptions = {
  [key: string]: string
}

interface UISelectProps extends SelectProps {
  /*
   * Defines the CSS class string that will be forwarded to the wrapping div "className" prop.
   */
  classes?: string
  /*
   * Defines the options available in the select. The SelectOptions object
   * keys are the property names, while the values correspond  to the text that
   * will be displayed in the UI
   */
  options: SelectOptions
  /*
   * Specifies the text that will be displayed in the label right next to the Select.
   * If omitted, the label will not be rendered.
   */
  labelText?: string
}

export default function Select({
  options,
  onChange,
  labelText,
  value,
  'aria-label': ariaLabel,
  classes,
  testId,
}: UISelectProps) {
  return (
    <div data-select className={classes}>
      {labelText && <label htmlFor="ui-select">{labelText}</label>}
      <UISelect
        data-testid={testId}
        onChange={onChange}
        value={value}
        aria-label={ariaLabel}
        id="ui-select"
      >
        {Object.keys(options).map((key) => (
          <option key={key} value={key}>
            {options[key]}
          </option>
        ))}
      </UISelect>
      <CaretDownIcon size={18} weight="bold" />
    </div>
  )
}
