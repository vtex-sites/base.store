import React from 'react'
import { Select as UISelect } from '@faststore/ui'
import { CaretDown as CaretDownIcon } from 'phosphor-react'

import './select.scss'

function Select() {
  return (
    <div data-base-select>
      <UISelect
        data-testid="search-sort"
        aria-label="Product Sort"
        id="select-sort"
      >
        <option value="quilos">Kg</option>
        <option value="bundle">Bundle</option>
      </UISelect>
      <CaretDownIcon size={18} weight="bold" />
    </div>
  )
}

export default Select
