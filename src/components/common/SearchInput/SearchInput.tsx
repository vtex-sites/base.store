import type { SearchEvent } from '@faststore/sdk'
import {
  formatSearchState,
  initSearchState,
  sendAnalyticsEvent,
} from '@faststore/sdk'
import { SearchInput as UISearchInput } from '@faststore/ui'
import { navigate } from 'gatsby'
import React from 'react'
import type { SearchInputProps as UISearchInputProps } from '@faststore/ui'
import { MagnifyingGlass as MagnifyingGlassIcon } from 'phosphor-react'

import './search-input.scss'

declare type SearchInputProps = {
  onMagnifierClick?: () => void
  buttonTestId?: string
} & Omit<UISearchInputProps, 'onSubmit'>

const doSearch = async (term: string) => {
  const { pathname, search } = formatSearchState(
    initSearchState({
      term,
      base: '/s',
    })
  )

  sendAnalyticsEvent<SearchEvent>({
    name: 'search',
    params: { search_term: term },
  })

  navigate(`${pathname}${search}`)
}

function SearchInput({
  onMagnifierClick,
  buttonTestId = 'store-search-button',
  ...props
}: SearchInputProps) {
  return (
    <UISearchInput
      icon={
        <MagnifyingGlassIcon
          onClick={onMagnifierClick}
          data-testid={buttonTestId}
        />
      }
      placeholder="Search everything at the store"
      onSubmit={doSearch}
      {...props}
    />
  )
}

export default SearchInput
