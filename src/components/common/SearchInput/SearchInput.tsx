import React from 'react'
import { navigate } from 'gatsby'
import type { SearchInputProps as UISearchInputProps } from '@faststore/ui'
import { SearchInput as UISearchInput } from '@faststore/ui'
import { initSearchParamsState, formatSearchParamsState } from '@faststore/sdk'

import './SearchInput.module.css'

declare type SearchInputProps = Omit<UISearchInputProps, 'onSubmit'>

const search = async (term: string) => {
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
