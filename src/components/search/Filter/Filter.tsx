import React, { useEffect, useState } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'
import { useSearch } from '@faststore/sdk'
import type {
  IStoreSelectedFacet,
  FacetedFilter_FacetsFragment,
} from '@generated/graphql'
import {
  Icon as UIIcon,
  List as UIList,
  Modal as UIModal,
  Accordion as UIAccordion,
  AccordionItem as UIAccordionItem,
  AccordionButton as UIAccordionButton,
  AccordionPanel as UIAccordionPanel,
} from '@faststore/ui'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import Button from 'src/components/ui/Button'
import Checkbox from 'src/components/ui/Checkbox'

interface Props {
  facets: FacetedFilter_FacetsFragment[]
  /*
   * Control whether the filter modal is open. (mobile only)
   */
  isOpen?: boolean
  /**
   * This function is called whenever the user hits "Escape", clicks outside
   * the filter modal or clicks in close button. (mobile only)
   */
  onDismiss?: (event: MouseEvent | KeyboardEvent) => void
  /**
   * ID to find this component in testing tools (e.g.: cypress,
   * testing-library, and jest).
   */
  testId?: string
}

function Filter({
  facets,
  onDismiss,
  isOpen = false,
  testId = 'store-filter',
}: Props) {
  const { width: screenWidth } = useWindowDimensions()
  const { toggleFacet, toggleFacets, state: searchState } = useSearch()

  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(
    new Set([])
  )

  const [selectedFilters, setSelectedFilters] = useState<IStoreSelectedFacet[]>(
    searchState.selectedFacets ?? []
  )

  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    if (screenWidth) {
      // notebook breakpoint = 1280px (See breakpoints on styles/global.scss)
      setIsMobile(screenWidth < 1280)
    }
  }, [screenWidth])

  const onAccordionChange = (index: number) => {
    if (expandedIndices.has(index)) {
      expandedIndices.delete(index)
      setExpandedIndices(new Set(expandedIndices))

      return
    }

    setExpandedIndices(new Set(expandedIndices.add(index)))
  }

  const onFilterChange = (item: IStoreSelectedFacet) => {
    if (selectedFilters.some((filter) => filter.value === item.value)) {
      const indexToRemove = selectedFilters.findIndex(
        (f) => f.value === item.value
      )

      selectedFilters.splice(indexToRemove, 1)
      setSelectedFilters([...selectedFilters])

      return
    }

    setSelectedFilters([...selectedFilters, item])
  }

  const onCheck = ({ key, value }: IStoreSelectedFacet) => {
    if (isMobile) {
      onFilterChange({ key, value })

      return
    }

    toggleFacet({ key, value })
    onFilterChange({ key, value })
  }

  const Filters = () => {
    return (
      <div data-store-filter data-testid={testId}>
        <UIAccordion indices={expandedIndices} onChange={onAccordionChange}>
          {facets
            .filter((facet) => facet.type === 'BOOLEAN')
            .map(({ label, values, key }, index) => (
              <UIAccordionItem key={`${label}-${index}`}>
                <UIAccordionButton data-testid="filter-accordion-button">
                  {label}
                  <UIIcon
                    component={
                      expandedIndices.has(index) ? <div>-</div> : <div>+</div>
                    }
                  />
                </UIAccordionButton>
                <UIAccordionPanel>
                  <UIList>
                    {values.map((item) => {
                      const id = `${label}-${item.label}`

                      return (
                        <li key={id}>
                          <Checkbox
                            id={id}
                            checked={selectedFilters.some(
                              (filter) => filter.value === item.value
                            )}
                            onChange={() => onCheck({ key, value: item.value })}
                            data-testid="filter-accordion-panel-checkbox"
                            data-value={item.value}
                            data-quantity={item.quantity}
                          />
                          <label htmlFor={id}>
                            {item.label} ({item.quantity})
                          </label>
                        </li>
                      )
                    })}
                  </UIList>
                </UIAccordionPanel>
              </UIAccordionItem>
            ))}
        </UIAccordion>
        {isMobile && (
          <div>
            <Button
              onClick={() => {
                toggleFacets(selectedFilters)
                setExpandedIndices(new Set([]))
                setSelectedFilters([])
              }}
            >
              Clear All
            </Button>
            <Button
              data-testid="apply-filters-button"
              onClick={() => toggleFacets(selectedFilters)}
            >
              View Results
            </Button>
          </div>
        )}
      </div>
    )
  }

  return isMobile ? (
    <UIModal isOpen={isOpen} onDismiss={onDismiss}>
      <h2>Filters</h2>
      <Button onClick={onDismiss} data-testid="close-filters-button">
        X
      </Button>
      <Filters />
    </UIModal>
  ) : (
    <>
      <h4>Filters</h4>
      <Filters />
    </>
  )
}

export default Filter
