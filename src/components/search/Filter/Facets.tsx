import './filter.scss'

import { useSearch } from '@faststore/sdk'
import { Label as UILabel, List as UIList } from '@faststore/ui'
import { graphql } from 'gatsby'
import React from 'react'
import Accordion, { AccordionItem } from 'src/components/ui/Accordion'
import { Badge } from 'src/components/ui/Badge'
import Checkbox from 'src/components/ui/Checkbox'
import type {
  IStoreSelectedFacet,
  Facets_FilteredFacetsFragment,
} from '@generated/graphql'

interface FacetsProps {
  slug: string
  testId: string
  selectedFacets: IStoreSelectedFacet[]
  filteredFacets: Facets_FilteredFacetsFragment[]
  indicesExpanded: Set<number>
  onFacetChange: (item: IStoreSelectedFacet) => void
  onAccordionChange: (index: number) => void
  onAccordionItemMount: (
    index: number,
    values: Facets_FilteredFacetsFragment['values']
  ) => void
}

const isMobile = () =>
  window.innerWidth <
  parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      '--breakpoint-notebook'
    ),
    10
  )

function Facets({
  slug,
  testId,
  selectedFacets,
  filteredFacets,
  indicesExpanded,
  onFacetChange,
  onAccordionChange,
  onAccordionItemMount,
}: FacetsProps) {
  const { toggleFacet } = useSearch()

  const onSelectFacet = ({ key, value }: IStoreSelectedFacet) => {
    if (!isMobile()) {
      toggleFacet({ key, value })
    }

    onFacetChange({ key, value })
  }

  return (
    <div className="filter" data-store-filter data-testid={testId}>
      <h2 className="title-small">Filters</h2>
      <Accordion expandedIndices={indicesExpanded} onChange={onAccordionChange}>
        {filteredFacets.map(({ label, values, key }, index) => (
          <AccordionItem
            key={`${label}-${index}`}
            testId="filter-accordion"
            isExpanded={indicesExpanded.has(index)}
            buttonLabel={label}
            ref={(_) => onAccordionItemMount(index, values)}
          >
            <UIList>
              {values.map((item) => {
                const id = `${label}-${item.label}`

                return (
                  <li key={id} className="filter__item">
                    <Checkbox
                      id={id}
                      checked={
                        item.value === slug ||
                        selectedFacets.some(
                          (facet) => facet.value === item.value
                        )
                      }
                      onChange={() => onSelectFacet({ key, value: item.value })}
                      data-testid="filter-accordion-panel-checkbox"
                      data-value={item.value}
                      data-quantity={item.quantity}
                      disabled={item.value === slug}
                    />
                    <UILabel htmlFor={id} className="title-small">
                      {item.label}{' '}
                      <Badge variant="neutral" small>
                        {item.quantity}
                      </Badge>
                    </UILabel>
                  </li>
                )
              })}
            </UIList>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export const fragment = graphql`
  fragment Facets_filteredFacets on StoreFacet {
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

export default Facets
