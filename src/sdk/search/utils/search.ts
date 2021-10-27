import { navigate } from 'gatsby'

import { slugify } from './slugify'

const pathExists = async (pathname: string) => {
  try {
    const response = await fetch(`${pathname}/`, {
      redirect: 'error',
    })

    if (response.status !== 200) {
      return false
    }

    return true
  } catch (err) {
    return false
  }
}

export const search = async (term: string) => {
  let pathname = ''
  const params = new URLSearchParams(window.location.search)

  // Check if "term" has a more specific page
  const slugified = encodeURIComponent(slugify(term))
  const path = `/${slugified}`
  const exists = await pathExists(path)

  params.delete('map')
  if (exists) {
    // The page /slugified exists, let's navigate to this page
    pathname = `/${slugified}`
  } else {
    // There is no specific page for this term, let's make a full text search
    params.set('map', 'term')
    pathname = `/s/${encodeURIComponent(term)}`
  }

  navigate(`${pathname}?${params.toString()}`)
}
