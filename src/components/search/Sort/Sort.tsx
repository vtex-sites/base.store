import React from 'react'
import { useSearch } from 'src/sdk/search/useSearch'

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
    searchParams: { sort },
  } = useSearch()

  return (
    <select
      style={{ padding: '10px' }}
      data-testid="search-sort"
      onChange={(e) => setSort(keys[e.target.selectedIndex])}
      value={sort}
    >
      {keys.map((key) => (
        <option key={key} value={key}>
          {OptionsMap[key]}
        </option>
      ))}
    </select>
  )
}

export default Sort
