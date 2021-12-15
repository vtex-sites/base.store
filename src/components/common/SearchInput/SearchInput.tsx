import { formatSearchState, initSearchState } from '@faststore/sdk'
import { SearchInput as UISearchInput } from '@faststore/ui'
import React, { useCallback } from 'react'
import type { SearchInputProps as UISearchInputProps } from '@faststore/ui'
import { useRouter } from 'next/router'

declare type SearchInputProps = Omit<UISearchInputProps, 'onSubmit'>

const useSearch = () => {
  const router = useRouter()

  return useCallback(
    (term: string) => {
      const { pathname, search } = formatSearchState(
        initSearchState({
          term,
          base: '/s',
        })
      )

      router.push(`${pathname}${search}`)
    },
    [router]
  )
}

function SearchInput(props: SearchInputProps) {
  const doSearch = useSearch()

  return <UISearchInput onSubmit={doSearch} {...props} />
}

export default SearchInput
