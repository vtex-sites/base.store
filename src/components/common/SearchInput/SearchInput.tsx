import React from 'react'
import { navigate } from 'gatsby'
import type { SearchInputProps as UISearchInputProps } from '@faststore/ui'
import { SearchInput as UISearchInput } from '@faststore/ui'
import { initSearchParamsState } from '@faststore/sdk'
import './SearchInput.module.css'
import { getLink } from 'src/sdk/search/Provider'

declare type SearchInputProps = Omit<UISearchInputProps, 'onSubmit'>

const search = async (term: string) => {
  const searchParamsState = initSearchParamsState({
    term,
    base: '/s',
  })

  navigate(getLink(searchParamsState))
}

function SearchInput(props: SearchInputProps) {
  return <UISearchInput onSubmit={search} {...props} />
}

export default SearchInput
