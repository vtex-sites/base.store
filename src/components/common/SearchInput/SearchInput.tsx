import type { SearchEvent } from '@faststore/sdk'
import {
  formatSearchState,
  initSearchState,
  sendAnalyticsEvent,
} from '@faststore/sdk'
import { SearchInput as UISearchInput } from '@faststore/ui'
import { navigate } from 'gatsby'
import React, { useState } from 'react'
import type {
  SearchInputProps as UISearchInputProps,
  SearchInputRef,
} from '@faststore/ui'
import useSearchHistory from 'src/sdk/search/useSearchHistory'
import Icon from 'src/components/ui/Icon'
import { SearchHistory } from 'src/components/search/History'
import { SuggestionsTopSearch } from 'src/components/search/Suggestions'

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
    const [openDropdown, setOpenDropdown] = useState(false)
    const { addToSearchHistory } = useSearchHistory()
    const handleSearch = (term: string) => {
      addToSearchHistory(term)
      doSearch(term)
    }

    return (
      <div
        data-store-search-input-wrapper
        data-store-search-input-dropdown-open={openDropdown}
      >
        <UISearchInput
          ref={ref}
          icon={
            <Icon
              name="MagnifyingGlass"
              onClick={onSearchClick}
              data-testid={buttonTestId}
            />
          }
          placeholder="Search everything at the store"
          onSubmit={handleSearch}
          onFocus={() => setOpenDropdown(true)}
          {...props}
        />
        {openDropdown && (
          <div data-store-search-input-dropdown-wrapper>
            <div data-store-search-input-dropdown>
              <SearchHistory
                onClear={() => {
                  console.warn('Implement `onClear`.')
                }}
              />
              <SuggestionsTopSearch
                searchedItems={[
                  { href: '/s/?q=monitor', name: 'Monitor' },
                  { href: '/s/?q=headphone', name: 'Headphone' },
                  { href: '/s/?q=headset', name: 'Headset' },
                  { href: '/s/?q=magic+mouse', name: 'Magic mouse' },
                  { href: '/s/?q=smart+speaker', name: 'Smart speaker' },
                ]}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
)

export default SearchInput
