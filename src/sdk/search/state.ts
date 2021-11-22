import { navigate } from 'gatsby'

export const applySearchState = (url: URL) => {
  const link = `${url.pathname}${url.search}`

  navigate(link)
}

export const replaceSearchState = (url: URL) => {
  const link = `${url.pathname}${url.search}`

  window.history.replaceState(undefined, '', link)
}
