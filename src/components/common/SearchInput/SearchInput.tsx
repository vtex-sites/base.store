import React from 'react'
import type { SearchInputProps } from '@vtex/store-ui'
import { SearchInput as UISearchInput } from '@vtex/store-ui'

import './SearchInput.module.css'

function SearchInput(props: SearchInputProps) {
  return <UISearchInput {...props} />
}

export default SearchInput
