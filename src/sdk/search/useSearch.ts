import { useContext } from 'react'

import { Context } from './Provider'

export const useSearch = () => {
  const value = useContext(Context)

  if (value == null) {
    throw new Error(
      'Error while reading context. Context need to be on the react tree'
    )
  }

  return value
}
