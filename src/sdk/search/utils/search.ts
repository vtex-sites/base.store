import { navigate } from 'gatsby'

// TODO move these files to faststore repository

import { slugify } from './slugify'
import { uniqBy } from './uniq'

const HISTORY_KEY = 'vtex:search-history'
const MAX_ITEMS = 10

const history = {
  get: (): string[] => JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]'),
  add: (term: string) => {
    const h = history.get()

    const updatedHistory = uniqBy([term, ...h].slice(0, MAX_ITEMS), (t) => t)

    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory))
  },
}

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

  history.add(term)

  navigate(`${pathname}?${params.toString()}`)
}
