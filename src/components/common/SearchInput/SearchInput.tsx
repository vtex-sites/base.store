import './SearchInput.module.css'

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

declare type SearchInputProps = Omit<UISearchInputProps, 'onSubmit'>

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

function SearchInput(props: SearchInputProps) {
  return <UISearchInput onSubmit={doSearch} {...props} />
}

export default SearchInput
