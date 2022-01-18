import { useSearch } from '@faststore/sdk'
import React from 'react'
import { Select as UISelect } from '@faststore/ui'
import { CaretDown as CaretDownIcon } from 'phosphor-react'

import './sort.scss'

const OptionsMap = {
  price_desc: 'Price, descending',
  price_asc: 'Price, ascending',
  orders_desc: 'Top sales',
  name_asc: 'Name, A-Z',
  name_desc: 'Name, Z-A',
  release_desc: 'Release date',
  discount_desc: 'Discount',
  score_desc: 'Relevance',
}

const keys = Object.keys(OptionsMap) as Array<keyof typeof OptionsMap>

function Sort() {
  const {
    setSort,
    state: { sort },
  } = useSearch()

  return (
    <div className="sort / title-small">
      <label htmlFor="select-sort">Sort by</label>
      <UISelect
        data-testid="search-sort"
        onChange={(e) => setSort(keys[e.target.selectedIndex])}
        value={sort}
        aria-label="Product Sort"
        id="select-sort"
      >
        {keys.map((key) => (
          <option key={key} value={key}>
            {OptionsMap[key]}
          </option>
        ))}
      </UISelect>
      <CaretDownIcon size={18} weight="bold" />
    </div>
  )
}

export default Sort
