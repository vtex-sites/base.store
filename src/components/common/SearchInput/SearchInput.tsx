import React from 'react'
import { navigate } from 'gatsby'
import type { SearchInputProps as UISearchInputProps } from '@faststore/ui'
import { SearchInput as UISearchInput } from '@faststore/ui'
import type { SearchEvent } from '@faststore/sdk'
import {
  initSearchParamsState,
  formatSearchParamsState,
  sendAnalyticsEvent,
} from '@faststore/sdk'

import './SearchInput.module.css'

declare type SearchInputProps = Omit<UISearchInputProps, 'onSubmit'>

const search = async (term: string) => {
  sendAnalyticsEvent<SearchEvent>({
    type: 'search',
    data: { search_term: term },
  })

  const searchParamsState = initSearchParamsState({
    term,
    base: '/s',
  })

  const formattedUrl = formatSearchParamsState(searchParamsState)

  navigate(formattedUrl.pathname + formattedUrl.search)
}

function SearchInput(props: SearchInputProps) {
  return <UISearchInput onSubmit={search} {...props} />
}

export default SearchInput
