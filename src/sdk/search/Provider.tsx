import {
  formatSearchParamsState,
  initSearchParamsState,
  removeSearchParam,
  setSearchParam,
} from '@faststore/sdk'
import { navigate } from 'gatsby'
import React, { createContext, useMemo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import type { SearchParamsState } from '@faststore/sdk'

export interface PageInfo {
  /** @description items per page */
  size: number
  /** @description total number of pages */
  total: number
}

interface PageConnection {
  cursor: number
  link: string
}

export interface SearchContext {
  pageInfo: PageInfo & {
    nextPage: PageConnection | false
    prevPage: PageConnection | false
    pages: number[]
    addNextPage: (e: any) => void
    addPreviousPage: (e: any) => void
    setCurrentPage: (page: number) => void
  }
  searchParams: SearchParamsState
  setFacet: (item: Facet) => void
  toggleFacet: (item: Facet) => void
  toggleFacets: (item: Facet[]) => void
  setSort: (sort: SearchParamsState['sort']) => void
}

export const Context = createContext<SearchContext | undefined>(undefined)

Context.displayName = 'SearchContext'

export const getLink = (searchParams: SearchParamsState) => {
  const { pathname, search } = formatSearchParamsState(searchParams)

  return `${pathname}${search}`
}

const apply = (params: SearchParamsState, replace = false) => {
  if (replace) {
    window.history.replaceState(undefined, '', getLink(params))
  } else {
    // Reset page when navigating so we see the first results after applying the filters
    navigate(getLink({ ...params, page: 0 }))
  }
}

interface Facet {
  selected?: boolean
  unique?: boolean
  value: string
  key: string
}

const toggleFacet = (item: Facet, state: SearchParamsState) =>
  item.selected === true
    ? removeSearchParam(state, { unique: false, ...item })
    : setSearchParam(state, { unique: false, ...item })

interface Props {
  searchParams: SearchParamsState
  pageInfo: PageInfo
  children: ReactNode
}

export const SearchProvider: FC<Props> = ({
  searchParams: initalState,
  children,
  pageInfo,
}) => {
  const [pages, setPages] = useState(() => [initalState.page])

  const value = useMemo(() => {
    const paramsState = initSearchParamsState(initalState)
    const nextPage = pages[pages.length - 1] + 1
    const previousPage = pages[0] - 1
    const hasNextPage = pageInfo.total > pages[pages.length - 1] + 1
    const hasPreviousPage = pages[0] > 0

    const pushPage = (e: any, direction: 'next' | 'prev') => {
      e.target.blur?.()
      e.preventDefault()
      if (direction === 'next' && hasNextPage) {
        setPages([...pages, nextPage])
      } else if (direction === 'prev' && hasPreviousPage) {
        setPages([previousPage, ...pages])
      }
    }

    return {
      toggleFacet: (item: Facet) => apply(toggleFacet(item, paramsState)),

      toggleFacets: (items: Facet[]) =>
        apply(items.reduce((s, item) => toggleFacet(item, s), paramsState)),

      setFacet: (item: Facet) =>
        apply(setSearchParam(paramsState, { unique: true, ...item })),

      setSort: (sort: SearchParamsState['sort']) =>
        apply(setSearchParam(paramsState, { key: 'sort', value: sort })),

      searchParams: paramsState,

      pageInfo: {
        total: pageInfo.total,
        size: pageInfo.size,
        nextPage: hasNextPage && {
          cursor: nextPage,
          link: getLink({ ...paramsState, page: nextPage }),
        },
        prevPage: hasPreviousPage && {
          cursor: previousPage,
          link: getLink({ ...paramsState, page: previousPage }),
        },
        pages,
        addNextPage: (e: any) => pushPage(e, 'next'),
        addPreviousPage: (e: any) => pushPage(e, 'prev'),
        setCurrentPage: (page: number) => apply({ ...paramsState, page }, true),
      },
    }
  }, [initalState, pageInfo.size, pageInfo.total, pages])

  return <Context.Provider value={value}>{children}</Context.Provider>
}
