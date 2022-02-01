import React, { useEffect, useState, useCallback } from 'react'
import { useSearch } from '@faststore/sdk'
import type {
  IStoreSelectedFacet,
  FacetedFilter_FacetsFragment,
} from '@generated/graphql'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import Button from 'src/components/ui/Button'
import { X as XIcon } from 'phosphor-react'
import SlideOver from 'src/components/ui/SlideOver'

import Facets from './Facets'

import './filter.scss'

interface FilterProps {
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
}: FilterProps) {
  const { isMobile } = useWindowDimensions()
  const { toggleFacets, state: searchState } = useSearch()

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

      selectedFacets.some((facet) => facet.value === item.value) &&
        setFacetsToRemove([...facetsToRemove, item])

      selectedFacets.splice(indexToRemove, 1)
      setSelectedFacets([...selectedFacets])

      return
    }

    setSelectedFacets([...selectedFacets, item])
  }

  const onAccordionItemMount = (
    index: number,
    values: FacetedFilter_FacetsFragment['values']
  ) => {
    // Ensures only one array item for each accordion's item
    if (activeFacets.length >= filteredFacets.length) {
      return
    }

    // Filter current selected facets from API
    const selectedValues = values.filter(({ selected }) => selected)

    activeFacets.push({
      accordionIndex: index,
      facets: selectedValues.map(({ value }) => value),
    })
    setActiveFacets(activeFacets)
  }

  const onApply = () => {
    // Only toggle new facets and keep the current ones applied
    const facetsToAdd = selectedFacets
      .map((facet) => !searchState.selectedFacets.includes(facet) && facet)
      .concat(facetsToRemove)
      .filter((facet) => typeof facet !== 'boolean') as IStoreSelectedFacet[]

    toggleFacets(facetsToAdd)

    setIndicesExpanded(new Set([]))
    onDismissTransition?.()
  }

  return !isMobile ? (
    <Facets
      slug={slug}
      testId={testId}
      selectedFacets={selectedFacets}
      filteredFacets={filteredFacets}
      indicesExpanded={indicesExpanded}
      onFacetChange={onFacetChange}
      onAccordionChange={onAccordionChange}
      onAccordionItemMount={onAccordionItemMount}
    />
  ) : (
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
        <Facets
          slug={slug}
          testId={testId}
          selectedFacets={selectedFacets}
          filteredFacets={filteredFacets}
          indicesExpanded={indicesExpanded}
          onFacetChange={onFacetChange}
          onAccordionChange={onAccordionChange}
          onAccordionItemMount={onAccordionItemMount}
        />
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
          onClick={() => onApply()}
        >
          Apply
        </Button>
      </footer>
    </SlideOver>
  )
}

export default Filter
