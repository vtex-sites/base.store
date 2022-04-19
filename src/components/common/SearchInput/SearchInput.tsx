import type { SearchEvent } from '@faststore/sdk'
import {
  formatSearchState,
  initSearchState,
  sendAnalyticsEvent,
} from '@faststore/sdk'
import type {
  SearchInputProps as UISearchInputProps,
  SearchInputRef,
} from '@faststore/ui'
import { SearchInput as UISearchInput } from '@faststore/ui'
import { navigate } from 'gatsby'
import { forwardRef, lazy, Suspense, useRef, useState } from 'react'
import Icon from 'src/components/ui/Icon'
import useSearchHistory from 'src/sdk/search/useSearchHistory'
import useOnClickOutside from 'src/sdk/ui/useOnClickOutside'

const Suggestions = lazy(() => import('src/components/search/Suggestions'))

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
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [suggestionsOpen, setSuggestionsOpen] = useState<boolean>(false)
    const searchRef = useRef<HTMLDivElement>(null)
    const { addToSearchHistory } = useSearchHistory()
    const handleSearch = (term: string) => {
      addToSearchHistory(term)
      doSearch(term)
      setSuggestionsOpen(false)
      setSearchQuery(term)
    }

    useOnClickOutside(searchRef, () => setSuggestionsOpen(false))

    return (
      <div ref={searchRef} className="search__wrapper">
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
          onChange={(e) => setSearchQuery(e.target.value)}
          onSubmit={handleSearch}
          onFocus={() => setSuggestionsOpen(true)}
          value={searchQuery}
          {...props}
        />
        {suggestionsOpen && (
          <Suspense fallback={null}>
            <div className="suggestions__wrapper">
              <Suggestions term={searchQuery} onSearch={handleSearch} />
            </div>
          </Suspense>
        )}
      </div>
    )
  }
)

export default SearchInput
