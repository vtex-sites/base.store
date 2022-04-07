import {
  formatSearchState,
  initSearchState,
  sendAnalyticsEvent,
} from '@faststore/sdk'
import { SearchInput as UISearchInput } from '@faststore/ui'
import { navigate } from 'gatsby'
import { forwardRef } from 'react'
import Icon from 'src/components/ui/Icon'
import useSearchHistory from 'src/sdk/search/useSearchHistory'
import type { SearchEvent } from '@faststore/sdk'
import type {
  SearchInputProps as UISearchInputProps,
  SearchInputRef,
} from '@faststore/ui'

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

const SearchInput = forwardRef<SearchInputRef, SearchInputProps>(
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
          <Icon
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
