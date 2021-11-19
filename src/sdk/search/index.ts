import { navigate } from 'gatsby'

export const applySearch = (url: URL) => {
  const link = `${url.pathname}${url.search}`

  navigate(link)
}

export const setSearchPage = (url: URL) => {
  const link = `${url.pathname}${url.search}`

  window.history.replaceState(undefined, '', link)
}
