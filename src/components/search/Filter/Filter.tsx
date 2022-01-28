import React, { useEffect, useState, useCallback } from 'react'
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
  /**
   * Current page's slug to be used as fixed facet
   */
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

  const [selectedFacets, setSelectedFacets] = useState<IStoreSelectedFacet[]>(
    searchState.selectedFacets ?? []
  )

  const [facetsToRemove, setFacetsToRemove] = useState<IStoreSelectedFacet[]>(
    []
  )

  let onDismissTransition: () => unknown
  const [activeFacets, setActiveFacets] = useState<ActiveFacets[]>([])
  const filteredFacets = facets.filter((facet) => facet.type === 'BOOLEAN')

  const onAccordionChange = useCallback((index: number) => {
    if (indicesExpanded.has(index)) {
      indicesExpanded.delete(index)
      setIndicesExpanded(new Set(indicesExpanded))

      return
    }

    setIndicesExpanded(new Set(indicesExpanded.add(index)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Ensures all required states are up to date at opening
  useEffect(() => {
    if (isOpen) {
      return
    }

    setActiveFacets([])
    setFacetsToRemove([])
    setSelectedFacets(searchState.selectedFacets)
  }, [isOpen, searchState.selectedFacets])

  // Opens accordion items with active facets
  useEffect(() => {
    // Ensures all the active facets were identified
    if (activeFacets.length !== filteredFacets.length) {
      return
    }

    // Ensures there isn't empty facets
    const selectedActiveFacets = activeFacets.filter(
      (item) => item.facets.length > 0
    )

    // Checks if accordion item is already opened
    selectedActiveFacets.forEach(
      ({ accordionIndex }) =>
        !indicesExpanded.has(accordionIndex) &&
        onAccordionChange(accordionIndex)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeFacets])

  const onFacetChange = (item: IStoreSelectedFacet) => {
    if (selectedFacets.some((facet) => facet.value === item.value)) {
      const indexToRemove = selectedFacets.findIndex(
        (f) => f.value === item.value
      )

      if (selectedFacets.some((facet) => facet.value === item.value)) {
        setFacetsToRemove([...facetsToRemove, item])
      }

      selectedFacets.splice(indexToRemove, 1)
      setSelectedFacets([...selectedFacets])

      return
    }

    setSelectedFacets([...selectedFacets, item])
  }

  const onCheck = ({ key, value }: IStoreSelectedFacet) => {
    if (!isMobile) {
      toggleFacet({ key, value })
    }

    onFacetChange({ key, value })
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
                const selectedValues = values.filter(({ selected }) => selected)

                // Ensures only one array item for each accordion's item
                if (activeFacets.length < filteredFacets.length) {
                  activeFacets.push({
                    accordionIndex: index,
                    facets: selectedValues.map(({ value }) => value),
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
                          selectedFacets.some(
                            (facet) => facet.value === item.value
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

  if (!isMobile) {
    return <Facets />
  }

  return (
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
              setSelectedFacets(searchState.selectedFacets)
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
            setFacetsToRemove(selectedFacets)
            setSelectedFacets([])
          }}
        >
          Clear All
        </Button>
        <Button
          variant="primary"
          data-testid="filter-modal-button-apply"
          onClick={() => {
            // Only toggle new facets and keep the current ones applied
            const facetsToAdd = selectedFacets
              .map(
                (facet) => !searchState.selectedFacets.includes(facet) && facet
              )
              .concat(facetsToRemove)
              .filter(
                (facet) => typeof facet !== 'boolean'
              ) as IStoreSelectedFacet[]

            toggleFacets(facetsToAdd)

            setIndicesExpanded(new Set([]))
            onDismissTransition?.()
          }}
        >
          Apply
        </Button>
      </footer>
    </SlideOver>
  )
}

export default Filter
