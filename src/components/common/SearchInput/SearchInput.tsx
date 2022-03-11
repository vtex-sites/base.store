import type { SearchEvent } from '@faststore/sdk'
import {
  formatSearchState,
  initSearchState,
  sendAnalyticsEvent,
} from '@faststore/sdk'
import { SearchInput as UISearchInput } from '@faststore/ui'
import { navigate } from 'gatsby'
import React from 'react'
import type {
  SearchInputProps as UISearchInputProps,
  SearchInputRef,
} from '@faststore/ui'
import useSearchHistory from 'src/sdk/search/useSeachHistory'
import IconSVG from 'src/components/common/IconSVG'

import './search-input.scss'

declare type SearchInputProps = {
  onSearchClick?: () => void
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

const SearchInput = React.forwardRef<SearchInputRef, SearchInputProps>(
  function SearchInput(
    { onSearchClick, buttonTestId = 'store-search-button', ...props },
    ref
  ) {
    const { addToSearchHistory } = useSearchHistory()
    const handleSearch = (term: string) => {
      addToSearchHistory(term)
      doSearch(term)
    }

    return (
      <UISearchInput
        ref={ref}
        icon={
          <IconSVG
            name="MagnifyingGlass"
            onClick={onSearchClick}
            data-testid={buttonTestId}
          />
        }
        placeholder="Search everything at the store"
        onSubmit={handleSearch}
        {...props}
      />
    )
  }
)

export default SearchInput
