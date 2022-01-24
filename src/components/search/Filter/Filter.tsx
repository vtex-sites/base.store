import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useSearch } from '@faststore/sdk'
import type {
  IStoreSelectedFacet,
  FacetedFilter_FacetsFragment,
} from '@generated/graphql'
import { List as UIList, Label as UILabel } from '@faststore/ui'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import Button from 'src/components/ui/Button'
import Checkbox from 'src/components/ui/Checkbox'
import { Badge } from 'src/components/ui/Badge'
import { X as XIcon } from 'phosphor-react'
import Accordion, { AccordionItem } from 'src/components/ui/Accordion'
import SlideOver from 'src/components/ui/SlideOver'

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
  onDismiss?: () => void
  /**
   * ID to find this component in testing tools (e.g.: cypress,
   * testing-library, and jest).
   */
  testId?: string
  slug?: string
}

type ActiveFacets = {
  facets: string[]
  accordionIndex: number
}

function Filter({
  facets,
  onDismiss,
  isOpen = false,
  testId = 'store-filter',
  slug = '',
}: Props) {
  const { isMobile } = useWindowDimensions()
  const { toggleFacet, toggleFacets, state: searchState } = useSearch()

  const [indicesExpanded, setIndicesExpanded] = useState<Set<number>>(
    new Set([])
  )

  const [selectedFilters, setSelectedFilters] = useState<IStoreSelectedFacet[]>(
    searchState.selectedFacets ?? []
  )

  const [filtersToRemove, setFiltersToRemove] = useState<IStoreSelectedFacet[]>(
    []
  )

  let onDismissTransition: () => unknown
  const [activeFacets, setActiveFacets] = useState<ActiveFacets[]>([])
  const filteredFacets = useMemo(
    () => facets.filter((facet) => facet.type === 'BOOLEAN'),
    [facets]
  )

  const onAccordionChange = useCallback(
    (index: number) => {
      if (indicesExpanded.has(index)) {
        indicesExpanded.delete(index)
        setIndicesExpanded(new Set(indicesExpanded))
        setActiveFacets([])

        return
      }

      setActiveFacets([])
      setIndicesExpanded(new Set(indicesExpanded.add(index)))
    },
    [indicesExpanded]
  )

  // Ensures selected filters are up to date at opening
  useEffect(() => {
    !isOpen && setSelectedFilters(searchState.selectedFacets)
  }, [isOpen, searchState.selectedFacets])

  // Opens accordion items with active facets
  useEffect(() => {
    // Ensures all the active facets were identified
    if (activeFacets.length !== filteredFacets.length) {
      return
    }

    // Ensures there isn't empty facets
    const filteredActiveFacets = activeFacets.filter(
      (item) => item.facets.length > 0
    )

    // Checks if accordion item is already opened
    filteredActiveFacets.map(
      ({ accordionIndex }) =>
        !indicesExpanded.has(accordionIndex) &&
        onAccordionChange(accordionIndex)
    )
  }, [isOpen, activeFacets, filteredFacets, indicesExpanded, onAccordionChange])

  const onFilterChange = (item: IStoreSelectedFacet) => {
    if (selectedFilters.some((filter) => filter.value === item.value)) {
      const indexToRemove = selectedFilters.findIndex(
        (f) => f.value === item.value
      )

      selectedFilters.splice(indexToRemove, 1)
      setSelectedFilters([...selectedFilters])
      setFiltersToRemove([...filtersToRemove, item])

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
        <Accordion
          expandedIndices={indicesExpanded}
          onChange={onAccordionChange}
        >
          {filteredFacets.map(({ label, values, key }, index) => (
            <AccordionItem
              key={`${label}-${index}`}
              testId="filter-accordion"
              isExpanded={indicesExpanded.has(index)}
              buttonLabel={label}
              ref={(_) => {
                // Filter current selected facets from API
                const filteredValues = values.filter(({ selected }) => selected)

                // Ensures only one array item for each accordion's item
                if (activeFacets.length < filteredFacets.length) {
                  activeFacets.push({
                    accordionIndex: index,
                    facets:
                      filteredValues.length > 0
                        ? filteredValues.map(({ value }) => value)
                        : [],
                  })
                  setActiveFacets(activeFacets)
                }
              }}
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
                          selectedFilters.some(
                            (filter) => filter.value === item.value
                          )
                        }
                        onChange={() => onCheck({ key, value: item.value })}
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

  return isMobile ? (
    <SlideOver
      isOpen={isOpen}
      onDismiss={onDismiss}
      onDismissTransition={(callback) => (onDismissTransition = callback)}
      size="partial"
      direction="rightSide"
      className="filter-modal__content"
    >
      <div className="filter-modal__body">
        <header className="filter-modal__header">
          <h2 className="title-display">Filters</h2>
          <Button
            className="filter-modal__button"
            data-testid="filter-modal-button-close"
            aria-label="Close"
            onClick={() => {
              setSelectedFilters(searchState.selectedFacets)
              onDismissTransition?.()
            }}
          >
            <XIcon size={32} />
          </Button>
        </header>
        <Facets />
      </div>
      <footer className="filter-modal__footer">
        <Button
          variant="secondary"
          onClick={() => {
            const filters = selectedFilters

            setFiltersToRemove(filters)
            setSelectedFilters([])
          }}
        >
          Clear All
        </Button>
        <Button
          variant="primary"
          data-testid="filter-modal-button-apply"
          onClick={() => {
            // Remove facets that user unchecked
            filtersToRemove.length > 0 && toggleFacets(filtersToRemove)

            // Only toggle new facets and keep the current ones applied
            const filtersToToggle = selectedFilters
              .map(
                (filter) =>
                  !searchState.selectedFacets.includes(filter) && filter
              )
              .filter((m) => typeof m !== 'boolean') as IStoreSelectedFacet[]

            toggleFacets(filtersToToggle)

            setActiveFacets([])
            setFiltersToRemove([])
            setSelectedFilters([])
            setIndicesExpanded(new Set([]))
            onDismiss?.()
          }}
        >
          View Results
        </Button>
      </footer>
    </SlideOver>
  ) : (
    <Facets />
  )
}

export default Filter
