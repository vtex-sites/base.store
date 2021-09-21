import { graphql } from 'gatsby'
import React, { useState } from 'react'
import { useSearch } from 'src/sdk/search/useSearch'
import type { FacetedFilter_FacetsFragment } from '@generated/FacetedFilter_facets.graphql'

import * as styles from './FacetedFilter.module.css'

interface Props {
  facets: FacetedFilter_FacetsFragment[]
}

function FacetedFilter({ facets }: Props) {
  const [selectedFilter, setSelectedFilter] = useState(-1)
  const { toggleFacet } = useSearch()

  return (
    <div className={styles.container}>
      {facets
        .filter((facet) => facet.type === 'BOOLEAN')
        .map(({ label, values, key }, index) => (
          <div key={`${label}-${index}`}>
            <button
              className={styles.button}
              onClick={() => setSelectedFilter(index)}
              data-testid="facet-filter-header"
            >
              {label}
            </button>
            {selectedFilter === index && (
              <ul>
                {values.map((item) => {
                  const id = `${label}-${item.label}`

                  return (
                    <li key={id}>
                      <input
                        id={id}
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleFacet({ key, ...item })}
                        data-testid="facet-filter-checkbox"
                        data-value={item.value}
                        data-quantity={item.quantity}
                      />
                      <label htmlFor={id}>
                        {item.label}({item.quantity})
                      </label>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        ))}
    </div>
  )
}

export const fragment = graphql`
  fragment FacetedFilter_facets on StoreFacet {
    key
    label
    type
    values {
      label
      value
      selected
      quantity
    }
  }
`

export default FacetedFilter
