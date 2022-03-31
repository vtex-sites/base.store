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
import type {
  SearchSuggestionsQueryQuery,
  SearchSuggestionsQueryQueryVariables,
} from '@generated/graphql'
import { gql } from '@vtex/graphql-utils'
import { navigate } from 'gatsby'
import type { ChangeEventHandler } from 'react'
import { default as React, useRef, useState } from 'react'
import Suggestions from 'src/components/search/Suggestions'
import Icon from 'src/components/ui/Icon'
import { request } from 'src/sdk/graphql/request'
import useSearchHistory from 'src/sdk/search/useSearchHistory'
import useOnClickOutside from 'src/sdk/ui/useOnClickOutside'
import './search-input.scss'

const SearchSuggestionsQuery = gql`
  query SearchSuggestionsQuery($term: String!) {
    search(term: $term) {
      suggestions {
        terms
        products {
          name
          slug
        }
      }
    }
  }
`

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
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [suggestionsOpen, setSuggestionsOpen] = useState<boolean>(false)
    const [suggestions, setSuggestions] =
      useState<SearchSuggestionsQueryQuery['search']['suggestions']>()

    const { addToSearchHistory } = useSearchHistory()
    const searchRef = useRef<HTMLDivElement>(null)
    const handleSearch = (term: string) => {
      addToSearchHistory(term)
      doSearch(term)
      setSuggestionsOpen(false)
      setSearchQuery(term)
    }

    useOnClickOutside(searchRef, () => setSuggestionsOpen(false))

    const handleChange: ChangeEventHandler<HTMLInputElement> = async (
      event
    ) => {
      setSearchQuery(event.target.value)

      if (event.target.value) {
        const { search } = await request<
          SearchSuggestionsQueryQuery,
          SearchSuggestionsQueryQueryVariables
        >(SearchSuggestionsQuery, {
          term: event.target.value,
        })

        setSuggestions(search.suggestions)
      }
    }

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
          onSubmit={handleSearch}
          onChange={handleChange}
          onFocus={() => setSuggestionsOpen(true)}
          value={searchQuery}
          {...props}
        />
        {searchQuery.length > 0 && suggestionsOpen && (
          <div className="suggestions__wrapper">
            <Suggestions
              onSearch={handleSearch}
              products={suggestions?.products ?? []}
              terms={suggestions?.terms ?? []}
            />
          </div>
        )}
      </div>
    )
  }
)

export default SearchInput
