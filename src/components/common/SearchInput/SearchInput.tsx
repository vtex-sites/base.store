import React from 'react'
import type { SearchInputProps } from '@faststore/ui'
import { SearchInput as UISearchInput } from '@faststore/ui'

import './SearchInput.module.css'

function SearchInput(props: SearchInputProps) {
  return <UISearchInput {...props} />
}

export default SearchInput
