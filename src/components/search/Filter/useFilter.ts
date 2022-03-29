import type { IStoreSelectedFacet } from '@faststore/api'
import { useSearch } from '@faststore/sdk'
import type { Filter_FacetsFragment } from '@generated/graphql'
import { useReducer, useMemo, useEffect } from 'react'

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
      return {
        ...state,
        selected: state.selected.filter((_, idx) => idx !== index),
      }
    }

    return {
      ...state,
      selected: [...state.selected, payload],
    }
  }

  return state
}

export const useFilter = (allFacets: Filter_FacetsFragment[]) => {
  const {
    state: { selectedFacets },
  } = useSearch()

  const [{ selected, expanded }, dispatch] = useReducer(reducer, null, () => ({
    expanded: new Set([]),
    selected: selectedFacets,
  }))

  const selectedMap = useMemo(
    () =>
      selected.reduce(
        (acc, facet) => ({
          ...acc,
          [facet.key]: {
            ...acc[facet.key],
            [facet.value]: facet,
          },
        }),
        {} as Record<string, Record<string, IStoreSelectedFacet>>
      ),
    [selected]
  )

  const facets = useMemo(
    () =>
      allFacets
        .filter((facet) => facet.type === 'BOOLEAN')
        .map((facet) => ({
          ...facet,
          values: facet.values.map(({ value, ...rest }) => ({
            ...rest,
            value,
            selected: Boolean(selectedMap[facet.key]?.[value]),
          })),
        })),
    [allFacets, selectedMap]
  )

  useEffect(() => {
    dispatch({
      type: 'selectFacets',
      payload: selectedFacets,
    })
  }, [selectedFacets])

  return { facets, selected, expanded, dispatch }
}
