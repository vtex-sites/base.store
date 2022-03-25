import { useSearch } from '@faststore/sdk'
import { graphql } from 'gatsby'
import React, { useEffect, useMemo, useReducer, useRef } from 'react'
import Button from 'src/components/ui/Button'
import Icon from 'src/components/ui/Icon'
import IconButton from 'src/components/ui/IconButton'
import SlideOver from 'src/components/ui/SlideOver'
import type {
  IStoreSelectedFacet,
  Filter_FacetsFragment,
} from '@generated/graphql'

import Facets from './Facets'

import './filter.scss'

interface Props {
  facets: Filter_FacetsFragment[]
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
}

type Callback = () => unknown

interface State {
  expanded: Set<number>
  selected: IStoreSelectedFacet[]
}

type Action =
  | {
      type: 'toggleExpanded'
      payload: number
    }
  | {
      type: 'selectFacets'
      payload: IStoreSelectedFacet[]
    }
  | {
      type: 'toggleFacet'
      payload: IStoreSelectedFacet
    }

const reducer = (state: State, action: Action) => {
  const { expanded, selected } = state
  const { type, payload } = action

  if (type === 'toggleExpanded') {
    if (expanded.has(payload)) {
      expanded.delete(payload)
    } else {
      expanded.add(payload)
    }

    return {
      ...state,
      expanded: new Set(expanded),
    }
  }

  if (type === 'selectFacets' && payload !== selected) {
    return {
      ...state,
      selected: payload,
    }
  }

  if (type === 'toggleFacet') {
    const index = state.selected.findIndex(
      (facet) => facet.key === payload.key && facet.value === payload.value
    )

    if (index > -1) {
      state.selected.splice(index, 1)

      return {
        ...state,
        selected: [...state.selected],
      }
    }

    return {
      ...state,
      selected: [...state.selected, payload],
    }
  }

  return state
}

function Filter({
  facets: allFacets,
  onDismiss,
  isOpen = false,
  testId = 'store-filter',
}: Props) {
  const { setFacets, toggleFacet, state: searchState } = useSearch()

  const [state, dispatch] = useReducer(reducer, null, () => ({
    expanded: new Set([]),
    selected: searchState.selectedFacets,
  }))

  const facets = useMemo(
    () => allFacets.filter((facet) => facet.type === 'BOOLEAN'),
    [allFacets]
  )

  const { expanded, selected } = state

  const dismissTransition = useRef<Callback | undefined>()

  useEffect(() => {
    dispatch({
      type: 'selectFacets',
      payload: searchState.selectedFacets,
    })
  }, [searchState.selectedFacets])

  return (
    <>
      <div className="hidden-mobile">
        <Facets
          facets={facets}
          testId={`desktop-${testId}`}
          selectedFacets={selected}
          indicesExpanded={expanded}
          onFacetChange={toggleFacet}
          onAccordionChange={(index) =>
            dispatch({ type: 'toggleExpanded', payload: index })
          }
        />
      </div>

      <SlideOver
        isOpen={isOpen}
        onDismiss={onDismiss}
        onDismissTransition={(callback) =>
          (dismissTransition.current = callback)
        }
        size="partial"
        direction="rightSide"
        className="filter-modal__content"
      >
        <div className="filter-modal__body">
          <header className="filter-modal__header">
            <h2 className="text__lead">Filters</h2>
            <IconButton
              data-testid="filter-modal-button-close"
              classes="filter-modal__button"
              aria-label="Close Filters"
              icon={<Icon name="X" width={32} height={32} />}
              onClick={() => {
                dispatch({
                  type: 'selectFacets',
                  payload: searchState.selectedFacets,
                })

                dismissTransition.current?.()
              }}
            />
          </header>
          <Facets
            facets={facets}
            testId={`mobile-${testId}`}
            selectedFacets={selected}
            indicesExpanded={expanded}
            onFacetChange={(facet) =>
              dispatch({ type: 'toggleFacet', payload: facet })
            }
            onAccordionChange={(index) =>
              dispatch({ type: 'toggleExpanded', payload: index })
            }
          />
        </div>
        <footer className="filter-modal__footer">
          <Button
            variant="secondary"
            onClick={() => dispatch({ type: 'selectFacets', payload: [] })}
          >
            Clear All
          </Button>
          <Button
            variant="primary"
            data-testid="filter-modal-button-apply"
            onClick={() => {
              setFacets(state.selected)
              onDismiss?.()
            }}
          >
            Apply
          </Button>
        </footer>
      </SlideOver>
    </>
  )
}

export const fragment = graphql`
  fragment Filter_facets on StoreFacet {
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

export default Filter
