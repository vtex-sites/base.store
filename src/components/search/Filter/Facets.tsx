import { Label as UILabel, List as UIList } from '@faststore/ui'
import React from 'react'
import Accordion, { AccordionItem } from 'src/components/ui/Accordion'
import { Badge } from 'src/components/ui/Badge'
import Checkbox from 'src/components/ui/Checkbox'
import type {
  IStoreSelectedFacet,
  Filter_FacetsFragment,
} from '@generated/graphql'

import './filter.scss'

interface FacetsProps {
  variant: 'mobile' | 'desktop'
  slug: string
  testId: string
  selectedFacets: IStoreSelectedFacet[]
  filteredFacets: Filter_FacetsFragment[]
  indicesExpanded: Set<number>
  onFacetChange: (item: IStoreSelectedFacet) => void
  onAccordionChange: (index: number) => void
  onAccordionItemMount: (
    index: number,
    values: Filter_FacetsFragment['values']
  ) => void
}

function Facets({
  variant,
  slug,
  testId,
  selectedFacets,
  filteredFacets,
  indicesExpanded,
  onFacetChange,
  onAccordionChange,
  onAccordionItemMount,
}: FacetsProps) {
  return (
    <div className="filter" data-store-filter data-testid={testId}>
      <h2 className="title-small">Filters</h2>
      <Accordion expandedIndices={indicesExpanded} onChange={onAccordionChange}>
        {filteredFacets.map(({ label, values, key }, index) => (
          <AccordionItem
            prefixId={variant}
            key={`${label}-${index}`}
            testId="filter-accordion"
            isExpanded={indicesExpanded.has(index)}
            buttonLabel={label}
            ref={(_) => onAccordionItemMount(index, values)}
          >
            <UIList>
              {values.map((item) => {
                const id = `${variant}-${label}-${item.label}`

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
                      onChange={() => onFacetChange({ key, value: item.value })}
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

export default Facets
