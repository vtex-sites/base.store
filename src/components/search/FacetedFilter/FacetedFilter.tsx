import { useSearch } from '@faststore/sdk'
import { graphql } from 'gatsby'
import React, { useState } from 'react'
import Button from 'src/components/ui/Button'
import Checkbox from 'src/components/ui/Checkbox'
import type { FacetedFilter_FacetsFragment } from '@generated/graphql'

interface Props {
  facets: FacetedFilter_FacetsFragment[]
}

function FacetedFilter({ facets }: Props) {
  const [selectedFilter, setSelectedFilter] = useState(-1)
  const { toggleFacet } = useSearch()

  return (
    <ul>
      {facets
        .filter((facet) => facet.type === 'BOOLEAN')
        .map(({ label, values, key }, index) => (
          <li key={`${label}-${index}`}>
            <Button
              onClick={() => setSelectedFilter(index)}
              data-testid="facet-filter-header"
            >
              {label}
            </Button>
            {selectedFilter === index && (
              <ul>
                {values.map((item) => {
                  const id = `${label}-${item.label}`

                  return (
                    <li key={id}>
                      <Checkbox
                        id={id}
                        checked={item.selected}
                        onChange={() => toggleFacet({ key, value: item.value })}
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
          </li>
        ))}
    </ul>
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
