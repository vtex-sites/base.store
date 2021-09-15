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
        .filter((facet) => facet.type === 'TEXT')
        .map(({ name, values }, index) => (
          <div key={`${name}-${index}`}>
            <button
              className={styles.button}
              onClick={() => setSelectedFilter(index)}
              data-testid="facet-filter-header"
            >
              {name}
            </button>
            {selectedFilter === index && (
              <ul>
                {values?.map((item) => {
                  const id = `${name}-${item?.name}`

                  return (
                    <li key={id}>
                      <input
                        id={id}
                        type="checkbox"
                        checked={!!item?.selected}
                        onChange={() => toggleFacet(item as any)}
                        data-testid="facet-filter-checkbox"
                        data-value={item?.value}
                        data-quantity={item?.quantity}
                      />
                      <label htmlFor={id}>
                        {item?.name}({item?.quantity})
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
  fragment FacetedFilter_facets on VTEX_Facet {
    name
    type
    values {
      key
      name
      value
      selected
      quantity
      range {
        from
        to
      }
    }
  }
`

export default FacetedFilter
