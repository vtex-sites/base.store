import './SearchInput.module.css'

import { formatSearchState, initSearchState } from '@faststore/sdk'
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

  navigate(`${pathname}${search}`)
}

function SearchInput(props: SearchInputProps) {
  return <UISearchInput onSubmit={doSearch} {...props} />
}

export default SearchInput
