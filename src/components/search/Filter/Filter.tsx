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
  Label as UILabel,
} from '@faststore/ui'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import Button from 'src/components/ui/Button'
import Checkbox from 'src/components/ui/Checkbox'
import { Badge } from 'src/components/ui/Badge'
import {
  X as XIcon,
  PlusCircle as PlusCircleIcon,
  MinusCircle as MinusCircleIcon,
} from 'phosphor-react'

import './filter.scss'

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
  onDismiss?: (event: MouseEvent | KeyboardEvent | undefined) => void
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
    if (!isMobile) {
      toggleFacet({ key, value })
    }

    onFilterChange({ key, value })
  }

  const Facets = () => {
    return (
      <div className="filter" data-store-filter data-testid={testId}>
        <h2 className="title-small">Filters</h2>
        <UIAccordion indices={expandedIndices} onChange={onAccordionChange}>
          {facets
            .filter((facet) => facet.type === 'BOOLEAN')
            .map(({ label, values, key }, index) => (
              <UIAccordionItem key={`${label}-${index}`}>
                <UIAccordionButton data-testid="filter-accordion-button">
                  {label}
                  <UIIcon
                    component={
                      expandedIndices.has(index) ? (
                        <MinusCircleIcon size={24} />
                      ) : (
                        <PlusCircleIcon size={24} />
                      )
                    }
                  />
                </UIAccordionButton>
                <UIAccordionPanel>
                  <UIList>
                    {values.map((item) => {
                      const id = `${label}-${item.label}`

                      return (
                        <li key={id} className="filter__item">
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
                </UIAccordionPanel>
              </UIAccordionItem>
            ))}
        </UIAccordion>
      </div>
    )
  }

  return isMobile ? (
    <UIModal
      isOpen={isOpen}
      onDismiss={onDismiss}
      className="filter-modal__content"
    >
      <div className="filter-modal__body">
        <header className="filter-modal__header">
          <h2 className="title-display">Filters</h2>
          <Button
            data-testid="filter-modal-button-close"
            aria-label="Close"
            onClick={onDismiss}
          >
            <XIcon size={18} weight="bold" />
          </Button>
        </header>
        <Facets />
      </div>
      <footer className="filter-modal__footer">
        <Button
          variant="secondary"
          onClick={() => {
            toggleFacets(selectedFilters)
            setExpandedIndices(new Set([]))
            setSelectedFilters([])
          }}
        >
          Clear All
        </Button>
        <Button
          variant="primary"
          data-testid="filter-modal-button-apply"
          onClick={(e) => {
            onDismiss?.(e)
            toggleFacets(selectedFilters)
          }}
        >
          View Results
        </Button>
      </footer>
    </UIModal>
  ) : (
    <Facets />
  )
}

export default Filter
